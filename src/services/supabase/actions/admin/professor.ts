'use server'
import { z } from 'zod'
import { createClient } from '../../actions'
import { revalidatePath } from 'next/cache'
import { Tables } from 'database.types'

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

export const getProfessorConfigData = async (id: string) => {
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
