'use server'
import { cookies } from 'next/headers'
import { API } from './halcones-db'
import { UserSchema } from './types'

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

  return user
}
