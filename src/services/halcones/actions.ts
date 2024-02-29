'use server'
import { cookies } from 'next/headers'
import { API } from './halcones-db'
import { SubjectSchema, UserSchema, UserTypes, WorkSchema } from '../supabase/functions/types'
import { foundUserRedirect } from '../supabase/functions/utils'
import { redirect } from 'next/navigation'

/* AUTH FUNCTIONS */
export const login = async (data: FormData) => {
  const res = await fetch(API + '/auth/login', {
    method: 'POST',
    body: data
  })

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Credenciales incorrectas')
    }

    throw new Error('Error al iniciar sesión')
  }

  const user = UserSchema.parse(await res.json())

  cookies().set('token', user.token)

  redirect(foundUserRedirect(user.user_type as UserTypes))

  return user
}

export const logout = async () => {
  cookies().delete('token')

  redirect('/login')
}

/* USER FUNCTIONS */
export const recoverAccount = async (token: string) => {
  const res = await fetch(API + `/auth/recover?token=${token}`)

  if (!res.ok) {
    throw new Error('Error al recuperar cuenta')
  }

  const user = UserSchema.parse(await res.json())

  return user
}

export const getUser = async () => {
  const token = cookies().get('token')

  if (token == null || token.value == null) return null

  return await recoverAccount(token.value)
}

/* STUDENT FUNCTIONS */

// subjects
export const getStudentSubjects = async () => {
  const user = await getUser()

  if (user == null) return []

  const res = await fetch(API + `/teachers_alumns/get_materias_from_alumnos/${user.id}`)

  if (!res.ok) {
    throw new Error('Error al recuperar materias')
  }

  const materias = SubjectSchema.array().parse(await res.json())

  return materias
}

// works
export const uploadWork = async (workId: number, dataWithFile: FormData) => {
  const user = await getUser()

  if (user == null) return

  const searchParams = new URLSearchParams()
  searchParams.append('alumn_id', user.id.toString())
  searchParams.append('work_id', workId.toString())

  const res = await fetch(API + `/teachers_alumns/alumn_upload_work?${searchParams.toString()}`, {
    method: 'POST',
    body: dataWithFile
  })

  if (!res.ok) {
    throw new Error('Error al subir trabajo')
  }
}

export const getWorks = async ({ isDone = false, subJectId }: { subJectId: number, isDone?: boolean }) => {
  const user = await getUser()

  if (user == null) return []

  const res = await fetch(API + `/teachers_alumns/get_works_alumn/${user.id}/${subJectId}?entregado=${isDone ? '1' : '0'}`)

  if (!res.ok) return []
  const works = WorkSchema.array().parse(await res.json())

  return works
}

export const getTopics = async ({
  subjectId,
  groupId,
  semesterId
}: {
  subjectId: number
  groupId: number
  semesterId: number
}) => {
  const searchParams = new URLSearchParams()

  searchParams.append('materia_id', subjectId.toString())
  searchParams.append('group_id', groupId.toString())
  searchParams.append('semestre_id', semesterId.toString())

  const res = await fetch(API + `/topics?${searchParams.toString()}`)

  if (!res.ok) return []

  return await res.json()
}

export const getGroups = async (subjectId: number) => {}
