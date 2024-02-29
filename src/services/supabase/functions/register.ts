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

export const register = ({ email, password, phone, birthdate, firstName, lastName, role }: RegisterProps) => {
  supabase.auth.signUp({
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
    .catch(error => console.error('Error registering:', error))
}
