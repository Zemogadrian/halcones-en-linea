'use server'
import { cookies } from 'next/headers'
import { API } from './halcones-db'
import { MateriaSchema, UserSchema, UserTypes } from './types'
import { foundUserRedirect } from './utils'
import { redirect } from 'next/navigation'

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

export const getMateriasFromStudent = async () => {
  const user = await getUser()

  if (user == null) return []

  const res = await fetch(API + `/teachers_alumns/get_materias_from_alumnos/${user.id}`)

  if (!res.ok) {
    throw new Error('Error al recuperar materias')
  }

  const materias = MateriaSchema.array().parse(await res.json())

  return materias
}
