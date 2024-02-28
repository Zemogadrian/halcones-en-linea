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

export const WorkInfoSchema = z.object({
  obersvaciones: z.string().nullable(),
  calificacion: z.number(),
  entregado: z.number(),
  file: z.string(),
  feedback: z.string()
})

export type WorkInfo = z.infer<typeof WorkInfoSchema>

export const WorkSchema = z.object({
  id: z.number(),
  profesor_id: z.number(),
  materia_id: z.number(),
  group_id: z.number(),
  semestre_id: z.number(),
  file_url: z.string(),
  description: z.string(),
  name: z.string(),
  deadline: z.coerce.date(),
  created_at: z.coerce.date(),
  plan_id: z.number(),
  tema: z.string(),
  info: WorkInfoSchema
})

export type Work = z.infer<typeof WorkSchema>
