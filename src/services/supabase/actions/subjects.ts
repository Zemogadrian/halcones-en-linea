'use server'
import { createClient } from '../actions'
import { z } from 'zod'

const SubjectScheme = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  created_at: z.string()
})

export const getSubjects = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('subjects').select('*')

  if (error != null) {
    console.error('Error getting subjects:', error)
    throw new Error('Error getting subjects')
  }

  return data
}

export const getSubjectsBySemester = async (semesterId: number) => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('semester_subjects').select('subjects(*)').eq('semester', semesterId)

  if (error != null) {
    console.error('Error getting subjects:', error)
    throw new Error('Error getting subjects')
  }

  const subjects = SubjectScheme.array().parse(data?.map((ss: {
    subjects: {
      created_at: string
      id: number
      name: string
      slug: string
    } | null
  }) => ss.subjects).filter(s => s != null))

  return subjects
}
