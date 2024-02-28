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
  last_connection: z.coerce.date().nullable(),
  status: z.number(),
  matricula: z.string()
})

export const enum UserTypes {
  ADMIN = 1,
  PROFESSOR = 2,
  STUDENT = 3,
  COORDINATOR = 4
}

export type User = z.infer<typeof UserSchema>

export const SubjectSchema = z.object({
  id: z.number(),
  career_id: z.number(),
  name: z.string()
})

export type Subject = z.infer<typeof SubjectSchema>
