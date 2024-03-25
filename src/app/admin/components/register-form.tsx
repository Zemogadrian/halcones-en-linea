'use client'

import { Form, LabeledInput, SubmitButton } from '@/components/utils'
import { register } from '@/services/supabase/client'
import { USER_TYPES } from '@/services/supabase/functions/types'
import { Account } from '@/services/supabase/types'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface Props {
  role: USER_TYPES
  redirect?: string
  defaultValues?: Account
}

export const RegisterForm = ({ role, redirect, defaultValues }: Props) => {
  const { push } = useRouter()

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

        if (redirect != null) {
          push(redirect)
        }
      })
      .catch((err) => {
        console.error(err)

        toast.error('Error al registrar usuario')
      })

    e.currentTarget.reset()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <LabeledInput
        label='Nombres'
        name='first_name'
        placeholder='Jose'
        defaultValue={defaultValues?.first_name ?? ''}
      />

      <LabeledInput
        label='Apellidos'
        name='last_name'
        placeholder='Perez Leon'
        defaultValue={defaultValues?.last_name ?? ''}
      />

      <LabeledInput
        label='Correo'
        name='email'
        type='email'
        placeholder='example@example.com'
        defaultValue={defaultValues?.email ?? ''}
      />

      {
        defaultValues == null && (
          <LabeledInput
            label='Contraseña'
            name='password'
            type='password'
            placeholder='********'
          />
        )
      }

      <LabeledInput
        label='Telefono'
        name='phone'
        type='tel'
        placeholder='1234567890'
        defaultValue={defaultValues?.phone ?? ''}
      />

      {
        defaultValues == null && (
          <LabeledInput
            label='Fecha de nacimiento'
            name='birthdate'
            type='date'
          />
        )
      }

      <SubmitButton>
        {
          defaultValues == null ? 'Registrar' : 'Actualizar'
        }
      </SubmitButton>
    </Form>
  )
}
