'use server'
import { Tables } from 'database.types'
import { createClient } from '../actions'
import { USER_TYPES } from '../functions/types'

export const getProfessors = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('user_data').select('*').eq('role', USER_TYPES.PROFESSOR)

  if (error != null) {
    console.error('Error getting professors:', error)
    throw new Error('Error getting professors')
  }

  return data
}

export const getCareers = async (id: string) => {
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

export const getMyReducedCareers = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getSession()

  if (error != null || data == null) {
    console.error('Error getting session:', error)
    throw new Error('Error getting session')
  }

  const { data: dataCareers, error: errorCareers } = await supabase.from('teacher_config').select('careers(id, name, slug)').eq('owner', data.session?.user.id ?? '')

  if (errorCareers != null || dataCareers == null) {
    console.error('Error getting professor careers:', error)
    throw new Error('Error getting professor careers')
  }

  return dataCareers.map(c => c.careers)
}
