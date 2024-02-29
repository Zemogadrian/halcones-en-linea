'use client'

import { register } from '@/services/supabase/client'

export const RegisterForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    register({
      birthdate: new Date(e.currentTarget.birthdate.value),
      email: e.currentTarget.email.value,
      firstName: e.currentTarget.first_name.value,
      lastName: e.currentTarget.last_name.value,
      password: e.currentTarget.password.value,
      phone: e.currentTarget.phone.value,
      role: 1
    })
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <input type='text' placeholder='Nombres' name='first_name' />
      <input
        type='text' placeholder='Apellidos'
        name='last_name'
      />
      <input
        name='email'
        type='email' placeholder='Correo'
      />
      <input
        type='password' placeholder='Contraseña'
        name='password'
      />
      <input
        type='tel' placeholder='Telefono'
        name='phone'
      />
      <input
        type='date' placeholder='Fecha de nacimiento'
        name='birthdate'
      />

      <button type='submit'>Registrar</button>
    </form>
  )
}
