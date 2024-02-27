import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  token: z.string(),
  profile_picture: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  created_at: z.coerce.date(),
  user_type: z.number(),
  last_connection: z.any(),
  status: z.number(),
  matricula: z.string()
})

export type User = z.infer<typeof UserSchema>
