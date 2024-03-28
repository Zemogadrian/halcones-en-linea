'use server'
import { Enums, Tables } from 'database.types'
import { createClient } from '../actions'
import { USER_TYPES } from '../functions/types'
import { CreateActivityProps } from './professor.types'

export const getProfessors = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('user_data').select('*').eq('role', USER_TYPES.PROFESSOR)

  if (error != null) {
    console.error('Error getting professors:', error)
    throw new Error('Error getting professors')
  }

  return data
}

export const getMyClasses = async (careerSlug: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getSession()

  if (error != null || data == null) {
    console.error('Error getting session:', error)
    throw new Error('Error getting session')
  }

  // convert licenciatura-en-psicolog%C3%ADa-educativa to licenciatura-en-psicologia-educativa

  const careerSlugFixed = decodeURIComponent(careerSlug)

  const { data: classes, error: errClasses } = await supabase.from('teacher_config').select('subjects(*), careers(id, name, slug), education_plans(id, name), groups(id, name), semesters(id, number)').eq('owner', data.session?.user.id ?? '').eq('careers.slug', careerSlugFixed)

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

  if (errClasses != null || classes == null) {
    console.error('Error getting professor subjects:', error)
    throw new Error('Error getting professor subjects')
  }

  for (const config of classes) {
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

  return configDataArray[0]
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

export async function createActivity <
Q extends Enums<'question_type'>,
T extends Enums<'activity_type'>
> (activity: CreateActivityProps<T, Q>) {
  const supabase = await createClient()

  const { data, error } = await supabase.from('activities').insert(activity.config).select('id').single()

  if (error != null || data == null) {
    console.error('Error creating activity:', error)
    throw new Error('Error creating activity')
  }

  if (activity.questions == null) return

  const questions = activity.questions.map(q => ({
    ...q,
    activity: data.id
  }))

  const { error: errorQuestions, data: questionsData } = await supabase.from('questions').insert(questions).select('id')

  if (errorQuestions != null || questionsData == null) {
    console.error('Error creating questions:', error)
    throw new Error('Error creating questions')
  }

  questions.forEach(async (q, i) => {
    if (q.type !== 'multiple_option' || q.responses == null) return

    const responses = q.responses.map(r => ({
      ...r,
      question: questionsData[i].id
    }))

    await supabase.from('multiple_options_responses').insert(responses).then(({ error: errorResponses }) => {
      if (errorResponses != null) {
        console.error('Error creating responses:', error)
        throw new Error('Error creating responses')
      }
    })
  })
}
