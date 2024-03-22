'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database, Tables } from 'database.types'
import { cookies } from 'next/headers'

import { foundUserRedirect } from '@/services/supabase/functions/utils'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { EducationPlan } from './types'
import { USER_TYPES } from './functions/types'
import { extractSemesters, filterSemestersToAdd, filterSemestersToDelete, filterSemestersToUpdate, filterSubjectsToAdd, filterSubjectsToDelete } from './utils/create-education-plan'

export const createClient = async () => createServerActionClient<Database>({
  cookies: () => cookies()
})

export const getTopics = async () => {
  return []
}

/* Groups */
export const getGroups = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('groups').select('id, name, created_at, careers(id, name)')

  if (error != null) {
    console.error('Error getting groups:', error)
    throw new Error('Error getting groups')
  }

  return data
}

export const getGroupsByCareer = async (careerId: number) => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('groups').select('id, name, created_at').eq('career', careerId)

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
export const assignClassToStudent = async (formdata: FormData) => {
  const data = Object.fromEntries(formdata.entries())

  const supabase = await createClient()

  const { error } = await supabase.from('student_config').insert({
    owner: z.coerce.string().parse(data.student),
    semester: z.coerce.number().parse(data.semester),
    career: z.coerce.number().parse(data.career),
    group: z.coerce.number().parse(data.group),
    education_plan: z.coerce.number().parse(data.educationPlan)
  })

  if (error != null) {
    console.error('Error assigning class to student:', error)
    throw new Error('Error assigning class to student')
  }
}

export const getStudents = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('user_data').select('*').eq('role', USER_TYPES.STUDENT)

  if (error != null) {
    console.error('Error getting students:', error)
    throw new Error('Error getting students')
  }

  return data
}

export const getStudentSubjects = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('student_config').select('semesters(number, semester_subjects(subjects(*)))')

  if (error != null) {
    console.error('Error getting student subjects:', error)
    throw new Error('Error getting student subjects')
  }

  return data
}

/* Professors */

export const getProfessors = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('user_data').select('*').eq('role', USER_TYPES.PROFESSOR)

  if (error != null) {
    console.error('Error getting professors:', error)
    throw new Error('Error getting professors')
  }

  return data
}

export const getProfessorCareers = async (id: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('teacher_config').select('subjects(*), careers(id, name), education_plans(id, name), groups(id, name), semesters(id, number)').eq('owner', id)

  if (error != null || data == null) {
    console.error('Error getting professor subjects:', error)
    throw new Error('Error getting professor subjects')
  }

  const configData: {
    [c: number]: {
      id: number
      name: string
      educationPlans: {
        [e: number]: {
          id: number
          name: string
          groups: {
            [g: number]: {
              id: number
              name: string
              semesters: {
                [s: number]: {
                  id: number
                  number: number
                  subjects: Array<Tables<'subjects'>>
                }
              }
            }
          }
        }
      }
    }
  } = {}

  for (const config of data) {
    if (config.careers == null || config.semesters == null || config.groups == null || config.subjects == null || config.education_plans == null) continue

    const c = configData[config.careers.id]

    if (c == null) {
      configData[config.careers.id] = {
        ...config.careers,
        educationPlans: {
          [config.education_plans.id]: {
            ...config.education_plans,
            groups: {
              [config.groups.id]: {
                ...config.groups,
                semesters: {
                  [config.semesters.id]: {
                    ...config.semesters,
                    subjects: [
                      config.subjects
                    ]
                  }
                }
              }
            }
          }
        }
      }

      continue
    }

    const e = c.educationPlans[config.education_plans.id]

    if (e == null) {
      c.educationPlans[config.education_plans.id] = {
        ...config.education_plans,
        groups: {
          [config.groups.id]: {
            ...config.groups,
            semesters: {
              [config.semesters.id]: {
                ...config.semesters,
                subjects: [
                  config.subjects
                ]
              }
            }
          }
        }
      }

      continue
    }

    const g = e.groups[config.groups.id]

    if (g == null) {
      e.groups[config.groups.id] = {
        ...config.groups,
        semesters: {
          [config.semesters.id]: {
            ...config.semesters,
            subjects: [
              config.subjects
            ]
          }
        }
      }

      continue
    }

    const s = g.semesters[config.semesters.id]

    if (s == null) {
      g.semesters[config.semesters.id] = {
        ...config.semesters,
        subjects: [
          config.subjects
        ]
      }

      continue
    }

    s.subjects.push(config.subjects)
  }

  const configDataArray = Object.values(configData).map(c => ({
    ...c,
    educationPlans: Object.values(c.educationPlans).map(e => ({
      ...e,
      groups: Object.values(e.groups).map(g => ({
        ...g,
        semesters: Object.values(g.semesters).map(s => s)
      }))
    }))
  }))

  return configDataArray
}

export const assingProfessorToSubject = async (data: FormData) => {
  const supabase = await createClient()

  const entries = Object.fromEntries(data.entries())

  const { error } = await supabase.from('teacher_config').insert({
    career: z.coerce.number().parse(entries.career),
    group: z.coerce.number().parse(entries.group),
    owner: z.coerce.string().parse(entries.professor),
    plan_edu: z.coerce.number().parse(entries.educationPlan),
    semester: z.coerce.number().parse(entries.semester),
    subject: z.coerce.number().parse(entries.subject)
  })

  if (error != null) {
    console.error('Error assigning professor to subject:', error)
    throw new Error('Error assigning professor to subject')
  }

  revalidatePath(`/admin/professors/view/${z.coerce.string().parse(entries.professor)}`)
}

/* Careers */
export const createCareer = async (data: FormData) => {
  'use server'

  const supabase = await createClient()

  const entries = Object.fromEntries(data.entries())

  await supabase.from('careers').insert({
    name: z.coerce.string().parse(entries.name),
    rvoe: z.coerce.string().parse(entries.rvoe),
    campus: z.coerce.number().parse(entries.campus)
  })

  revalidatePath('/admin/careers')
  redirect('/admin/careers')
}

export const getCareers = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('careers').select('id, name, rvoe, created_at, campus(id, name)')

  if (error != null) {
    console.error('Error getting careers:', error)
    throw new Error('Error getting careers')
  }

  return data
}

export const getReducedCareers = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('careers').select('id, name, campus(id, name)')

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
export const getAccount = async (id: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('user_data').select('*').eq('owner', id).single()

  if (error != null) {
    console.error('Error getting professor:', error)
    throw new Error('Error getting professor')
  }

  return data
}

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
export const getSubjectsBySemester = async (semesterId: number) => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('semester_subjects').select('subjects(*)').eq('semester', semesterId)

  if (error != null) {
    console.error('Error getting subjects:', error)
    throw new Error('Error getting subjects')
  }

  const subjects = data?.map((ss: {
    subjects: {
      created_at: string
      id: number
      name: string
    } | null
  }) => ss.subjects).filter(s => s != null) as Array<Tables<'subjects'>>

  return subjects
}

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

  const semesters = extractSemesters(subjects, entries)

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

  const semesters = extractSemesters(subjects, entries)

  await supabase.from('education_plans').update({
    name: z.coerce.string().parse(entries.name)
  }).eq('id', oldPlan.id)

  const semestersToDelete = filterSemestersToDelete(semesters, oldPlan)

  for (const semester of semestersToDelete) {
    if (semester == null) continue

    await supabase.from('semesters').delete().eq('id', semester.id)
  }

  const semestersToUpdate = filterSemestersToUpdate(semesters, oldPlan)

  for (const semester of semestersToUpdate) {
    if (semester == null) continue

    const subjectsToDelete = filterSubjectsToDelete(oldPlan, semester)

    const { data: se } = await supabase.from('semesters').select('id').eq('education_plan', oldPlan.id).eq('number', semester.semester).single()

    for (const subject of subjectsToDelete ?? []) {
      if (subject == null) continue

      await supabase.from('semester_subjects').delete().eq('subject', subject.subjects?.id ?? 0).eq('semester', se?.id ?? 0)
    }

    const subjectsToAdd = filterSubjectsToAdd(semester, oldPlan)

    for (const subject of subjectsToAdd) {
      if (subject == null) continue

      await supabase.from('semester_subjects').insert({
        semester: se?.id ?? 0,
        subject: subject.id
      })
    }
  }

  const semestersToAdd = filterSemestersToAdd(semesters, oldPlan)

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

  const { data, error } = await supabase.from('education_plans').select('id, name, created_at, careers(id, name), semesters(*, semester_subjects(subjects(*)))')

  if (error != null) {
    console.error('Error getting education plans:', error)
    throw new Error('Error getting education plans')
  }

  return data
}

export const getEducationPlan = async (id: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('education_plans').select('*, careers(id, name), semesters(*, semester_subjects(subjects(*)))').eq('id', id).single()

  if (error != null) {
    console.error('Error getting education plan:', error)
    throw new Error('Error getting education plan')
  }

  return data
}

export const getEducationPlansByCareer = async (careerId: number) => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('education_plans').select('id, name, created_at, semesters(id, number)').eq('career', careerId)

  if (error != null) {
    console.error('Error getting education plan:', error)
    throw new Error('Error getting education plan')
  }

  return data
}
