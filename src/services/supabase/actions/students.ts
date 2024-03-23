'use server'
import { z } from 'zod'
import { createClient } from '../actions'
import { USER_TYPES } from '../functions/types'

const SubjectScheme = z.object({
  id: z.number(),
  name: z.string()
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
