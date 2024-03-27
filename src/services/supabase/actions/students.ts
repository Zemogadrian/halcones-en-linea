'use server'
import { z } from 'zod'
import { createClient } from '../actions'
import { USER_TYPES } from '../functions/types'

const SubjectScheme = z.object({
  id: z.number(),
  name: z.string()
})

const SubjectWithCreatedDate = SubjectScheme.extend({
  created_at: z.string(),
  slug: z.string()
})

export const getStudents = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('user_data').select('*').eq('role', USER_TYPES.STUDENT)

  if (error != null) {
    console.error('Error getting students:', error)
    throw new Error('Error getting students')
  }

  return data
}

export const getClasses = async (id: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('student_config').select('careers(id, name), education_plans(id, name), semesters(id, number, semester_subjects(subjects(id, name))), groups(id, name)').eq('owner', id)

  if (error != null) {
    console.error('Error getting student careers:', error)
    throw new Error('Error getting student careers')
  }

  const careers = data.map(c => ({
    ...c.careers,
    educationPlan: c.education_plans,
    actualSemester: {
      id: c.semesters?.id,
      number: c.semesters?.number,
      semester_subjects: null,
      subjects: SubjectScheme.array().parse(c.semesters?.semester_subjects.map(ss => ss.subjects).filter(s => s != null) ?? [])
    },
    group: c.groups
  }))

  return careers
}

export const getMySubjects = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getSession()

  if (error != null || data.session == null) {
    console.error('Error getting session:', error)
    throw new Error('Error getting session')
  }

  const userId = data.session.user.id

  const { data: studentData, error: studentError } = await supabase.from('student_config').select('semesters(semester_subjects(subjects(*)))').eq('owner', userId)

  if (studentError != null) {
    console.error('Error getting student subjects:', studentError)
    throw new Error('Error getting student subjects')
  }

  const subjects = SubjectWithCreatedDate.array().parse(
    (studentData?.map(s => s.semesters?.semester_subjects.map(ss => ss.subjects)) ?? []).flat()
  )

  return subjects
}
