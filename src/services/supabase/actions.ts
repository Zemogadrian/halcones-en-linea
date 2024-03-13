'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from 'database.types'
import { cookies } from 'next/headers'

import { foundUserRedirect } from '@/services/supabase/functions/utils'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { EducationPlan } from './types'
import { USER_TYPES } from './functions/types'

export const createClient = async () => createServerActionClient<Database>({
  cookies: () => cookies()
})

export const getTopics = async () => {
  return []
}

/* Groups */
export const getGroups = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('groups').select('*')

  if (error != null) {
    console.error('Error getting groups:', error)
    throw new Error('Error getting groups')
  }

  return data
}

export const createGroup = async (data: FormData) => {
  const supabase = await createClient()

  const entries = Object.fromEntries(data.entries())

  await supabase.from('groups').insert({
    name: z.coerce.string().parse(entries.name),
    career: z.coerce.number().parse(entries.career)
  })

  revalidatePath('/admin/groups')
  redirect('/admin/groups')
}

/* Students */
export const getStudents = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('user_data').select('*').eq('role', USER_TYPES.STUDENT)

  if (error != null) {
    console.error('Error getting students:', error)
    throw new Error('Error getting students')
  }

  console.log(data)

  return data
}

export const getStudentSubjects = async (id: number) => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('student_config').select('semesters(number, semester_subjects(subject(*)))')

  if (error != null) {
    console.error('Error getting student subjects:', error)
    throw new Error('Error getting student subjects')
  }

  console.log(data)

  return data
}

/* Professors */
export const getProfessor = async (id: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('user_data').select('*').eq('owner', id).single()

  if (error != null) {
    console.error('Error getting professor:', error)
    throw new Error('Error getting professor')
  }

  return data
}

export const getProfessors = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('user_data').select('*').eq('role', USER_TYPES.PROFESSOR)

  if (error != null) {
    console.error('Error getting professors:', error)
    throw new Error('Error getting professors')
  }

  return data
}

/* Careers */
export const createCareer = async (data: FormData) => {
  'use server'

  const supabase = await createClient()

  const entries = Object.fromEntries(data.entries())

  await supabase.from('careers').insert({
    name: z.coerce.string().parse(entries.name),
    rvoe: z.coerce.string().parse(entries.rvoe),
    campus: z.coerce.number().parse(entries.campus),
    plan_edu: z.coerce.number().parse(entries.plan)
  })

  revalidatePath('/admin/careers')
  redirect('/admin/careers')
}

export const getCareers = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('careers').select('id, name, rvoe, created_at, campus(name)')

  if (error != null) {
    console.error('Error getting careers:', error)
    throw new Error('Error getting careers')
  }

  return data
}

/* Campus */
export const getCampuses = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('campus').select('*')

  if (error != null) {
    console.error('Error getting campuses:', error)
    throw new Error('Error getting campuses')
  }

  return data
}

/* Auth */
export const login = async (email: string, password: string) => {
  const supabase = await createClient()

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error != null) {
    console.error('Error logging in:', error)
    throw new Error('Error logging in')
  }

  const { data: userData } = await supabase.from('user_data').select('roles(*)').eq('owner', data.user.id).single()

  const redirectUrl = foundUserRedirect(userData?.roles?.id ?? 0)

  redirect(redirectUrl)
}

export const logout = async () => {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error != null) {
    console.error('Error logging out:', error)
    throw new Error('Error logging out')
  }

  redirect('/login')
}

export const getUser = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getSession()

  if (error != null || data?.session == null) {
    console.error('Error getting user:', error)
    throw new Error('Error getting user')
  }

  const { data: userData } = await supabase.from('user_data').select('*, roles(*)').eq('owner', data.session.user.id).single()

  return userData
}

/* Subjects */
export const getSubjects = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('subjects').select('*')

  if (error != null) {
    console.error('Error getting subjects:', error)
    throw new Error('Error getting subjects')
  }

  return data
}

export const insertSubject = async (name: string) => {
  const supabase = await createClient()

  const { error } = await supabase.from('subjects').insert({ name })

  if (error != null) {
    console.error('Error inserting subject:', error)
    throw new Error('Error inserting subject')
  }

  revalidatePath('/admin/subjects')

  redirect('/admin/subjects')
}

export const insertSubjectUsingForm = async (data: FormData) => {
  const name = data.get('name')
  const safeName = z.string().parse(name)

  await insertSubject(safeName)
}

/* Education plans */
export const createEducationPlan = async (data: FormData) => {
  const supabase = await createClient()

  const subjects = await getSubjects()

  const entries = Object.fromEntries(data.entries())

  const [,...semesters] = Object.entries(entries).map(([key, value]) => {
    if (key.startsWith('subjects-')) {
      const newValue = z.coerce.string().parse(value)

      return {
        semester: key.split('-')[1],
        subjects: newValue.split(',').map((subjectName) => subjects.find((subject) => subject.name === subjectName))
      }
    }

    return null
  }).filter((value) => value != null)

  const { data: eduPlan } = await supabase.from('education_plans').insert({
    name: z.coerce.string().parse(entries.name),
    career: z.coerce.number().parse(entries.career)
  }).select('id').single()

  for (const semester of semesters) {
    if (
      semester == null ||
      eduPlan == null ||
      semester.subjects.length === 0
    ) continue

    const { data: se } = await supabase.from('semesters').insert({
      education_plan: eduPlan.id,
      number: z.coerce.number().parse(semester.semester)
    }).select('id').single()

    for (const subject of semester.subjects) {
      if (se == null || subject == null) continue

      await supabase.from('semester_subjects').insert({
        semester: se.id,
        subject: subject.id
      })
    }
  }

  revalidatePath('/admin/education-plans')
  redirect('/admin/education-plans')
}

export const updateEducationPlan = async (oldPlan: EducationPlan, data: FormData) => {
  const supabase = await createClient()

  const subjects = await getSubjects()

  const entries = Object.fromEntries(data.entries())

  const [,...semesters] = Object.entries(entries).map(([key, value]) => {
    if (key.startsWith('subjects-')) {
      const newValue = z.coerce.string().parse(value)

      return {
        semester: key.split('-')[1],
        subjects: newValue.split(',').map((subjectName) => subjects.find((subject) => subject.name === subjectName))
      }
    }

    return null
  }).filter((value) => value != null)

  await supabase.from('education_plans').update({
    name: z.coerce.string().parse(entries.name)
  }).eq('id', oldPlan.id)

  console.log(z.coerce.string().parse(entries.name))

  const semestersToDelete = oldPlan.semesters.filter((semester) => {
    return !semesters.some((newSemester) => newSemester?.semester === semester.number.toString())
  })

  for (const semester of semestersToDelete) {
    if (semester == null) continue

    await supabase.from('semesters').delete().eq('id', semester.id)
  }

  const semestersToUpdate = semesters.filter((semester) => {
    return oldPlan.semesters.some((oldSemester) => oldSemester.number.toString() === semester?.semester)
  })

  for (const semester of semestersToUpdate) {
    if (semester == null) continue

    const subjectsToDelete = oldPlan.semesters.find((oldSemester) => oldSemester.number.toString() === semester.semester)?.semester_subjects.filter((ss) => {
      return !semester.subjects.some((subject) => subject?.name === ss.subjects?.name)
    })

    const { data: se } = await supabase.from('semesters').select('id').eq('education_plan', oldPlan.id).eq('number', semester.semester).single()

    for (const subject of subjectsToDelete ?? []) {
      if (subject == null) continue

      await supabase.from('semester_subjects').delete().eq('subject', subject.subjects?.id ?? 0).eq('semester', se?.id ?? 0)
    }

    const subjectsToAdd = semester.subjects.filter((subject) => {
      const edu = oldPlan.semesters.find((oldSemester) => oldSemester.number.toString() === semester.semester)

      if (edu == null) return []

      return !edu.semester_subjects.some((ss) => ss?.subjects?.name === subject?.name)
    })

    for (const subject of subjectsToAdd) {
      if (subject == null) continue

      await supabase.from('semester_subjects').insert({
        semester: se?.id ?? 0,
        subject: subject.id
      })
    }
  }

  const semestersToAdd = semesters.filter((semester) => {
    return !oldPlan.semesters.some((oldSemester) => oldSemester.number.toString() === semester?.semester)
  })

  for (const semester of semestersToAdd) {
    if (semester == null) continue

    const { data: se } = await supabase.from('semesters').insert({
      education_plan: oldPlan.id,
      number: z.coerce.number().parse(semester.semester)
    }).select('id').single()

    for (const subject of semester.subjects) {
      if (se == null || subject == null) continue

      await supabase.from('semester_subjects').insert({
        semester: se.id,
        subject: subject.id
      })
    }
  }

  revalidatePath('/admin/education-plans')
  redirect('/admin/education-plans')
}

export const getEducationPlans = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('education_plans').select('*, semesters(*, semester_subjects(subjects(*)))')

  if (error != null) {
    console.error('Error getting education plans:', error)
    throw new Error('Error getting education plans')
  }

  return data
}

export const getEducationPlan = async (id: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('education_plans').select('*, semesters(*, semester_subjects(subjects(*)))').eq('id', id).single()

  if (error != null) {
    console.error('Error getting education plan:', error)
    throw new Error('Error getting education plan')
  }

  return data
}
