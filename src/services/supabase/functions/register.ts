import { supabase } from '../client'

interface RegisterProps {
  email: string
  password: string
  phone: string
  firstName: string
  lastName: string
  role: number
  birthdate: Date
}

export const register = async ({ email, password, phone, birthdate, firstName, lastName, role }: RegisterProps) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    phone,
    options: {
      data: {
        phone,
        birthdate: birthdate.toISOString(),
        first_name: firstName,
        last_name: lastName,
        role
      }
    }
  })

  console.log(data, error)

  if (error != null) {
    throw new Error(error.message)
  }

  return data
}
