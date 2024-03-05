'use client'

import { LabeledInput, SubmitButton } from '@/components/utils'
import { register } from '@/services/supabase/client'
import { USER_TYPES } from '@/services/supabase/functions/types'
import { toast } from 'sonner'

interface Props {
  role: USER_TYPES
}

export const RegisterForm = ({ role }: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    register({
      birthdate: new Date(e.currentTarget.birthdate.value),
      email: e.currentTarget.email.value,
      firstName: e.currentTarget.first_name.value,
      lastName: e.currentTarget.last_name.value,
      password: e.currentTarget.password.value,
      phone: e.currentTarget.phone.value,
      role
    })
      .then(() => {
        toast.success('Usuario registrado')
      })
      .catch((err) => {
        console.error(err)

        toast.error('Error al registrar usuario')
      })

    e.currentTarget.reset()
  }

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <LabeledInput
        label='Nombres'
        name='first_name'
        placeholder='Jose'
      />

      <LabeledInput
        label='Apellidos'
        name='last_name'
        placeholder='Perez Leon'
      />

      <LabeledInput
        label='Correo'
        name='email'
        type='email'
        placeholder='example@example.com'
      />

      <LabeledInput
        label='Contraseña'
        name='password'
        type='password'
        placeholder='********'
      />

      <LabeledInput
        label='Telefono'
        name='phone'
        type='tel'
        placeholder='1234567890'
      />

      <LabeledInput
        label='Fecha de nacimiento'
        name='birthdate'
        type='date'
      />

      <SubmitButton>
        Registrar
      </SubmitButton>
    </form>
  )
}
