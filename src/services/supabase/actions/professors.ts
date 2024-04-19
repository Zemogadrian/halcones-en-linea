'use server'
import { Enums, Tables } from 'database.types'
import { createClient } from '../actions'
import { USER_TYPES } from '../functions/types'
import { CreateActivityProps, GetMyActivitiesProps } from './professor.types'
import { revalidatePath } from 'next/cache'

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
  QT extends Enums<'question_type'>,
  AT extends Enums<'activity_type'>
> (
  activity: CreateActivityProps<AT, QT>,
  searchParams: {
    [key: string]: string
  }
) {
  const supabase = await createClient()

  const { data: professorData, error: professorError } = await supabase.auth.getSession()

  if (professorError != null || professorData == null) {
    console.log('Error getting session:', professorError)
    throw new Error('Error getting session')
  }

  const { data, error } = await supabase.from('activities').insert({
    ...activity.config,
    professor: professorData.session?.user.id ?? ''
  }).select('id').single()

  if (error != null || data == null) {
    console.log('Error creating activity:', error)
    throw new Error('Error creating activity')
  }

  if (activity.files != null && activity.files.length > 0) {
    const bufferFilesArray = activity.files.map((base64File) => Buffer.from(base64File.bytes, 'base64'))

    const bucketName = 'activities'

    bufferFilesArray?.forEach(async (b, i) => {
      const name = (activity.files ?? [])[i].name ?? ''

      console.log('Uploading file:', name)

      const path = `/${data.id}/${name}`

      const { data: bucketData, error: bucketError } = await supabase.storage.from(bucketName).upload(path, b)

      console.log({
        bucketData, bucketError
      })
    })
  }

  if (activity.questions != null) {
    const questions = activity.questions.map(q => ({
      question: q.question ?? '',
      type: q.type ?? 'multiple_option',
      accept_file: q.accept_file ?? false,
      activity: data.id,
      responses: q.responses ?? []
    }))

    console.log(questions)

    const { error: errorQuestions, data: questionsData } = await supabase.from('questions').insert(questions.map(q => ({
      question: q.question,
      type: q.type,
      accept_file: q.accept_file,
      activity: q.activity
    }))).select('id')

    console.log({
      errorQuestions, questionsData
    })

    if (errorQuestions != null || questionsData == null) {
      console.log('Error creating questions:', errorQuestions)
      throw new Error('Error creating questions')
    }

    await Promise.all(
      questions.map(async (q, i) => {
        if (q.type !== 'multiple_option' || q.responses == null) return

        const responses = q.responses.map(r => ({
          ...r,
          question: questionsData[i].id
        }))

        await supabase.from('responses').insert(responses)
          .then(({ error: errorResponses }) => {
            if (errorResponses != null) {
              console.log('Error creating responses:', error)
              throw new Error('Error creating responses')
            }
          })
      })
    )
  }

  const newSearchParams = new URLSearchParams(searchParams)

  newSearchParams.delete('section')
  newSearchParams.delete('type')
  newSearchParams.delete('currentPosition')
  newSearchParams.delete('name')
  newSearchParams.delete('desc')
  newSearchParams.delete('questionIndex')
  newSearchParams.delete('deadline')
  newSearchParams.delete('lastQuestionIndex')

  const { data: careerData } = await supabase.from('careers').select('slug').eq('id', activity.config.career).single()
  const { data: subjectData } = await supabase.from('subjects').select('slug').eq('id', activity.config.subject).single()

  const newPathname = decodeURIComponent(`/professor/career/${careerData?.slug ?? ''}/${subjectData?.slug ?? ''}/activities?${newSearchParams.toString()}`)

  revalidatePath(newPathname)

  return {
    careerSlug: careerData?.slug ?? '',
    subjectSlug: subjectData?.slug ?? '',
    searchParams: newSearchParams.toString()
  }
}

export const getMyActivities = async ({ careerId, educationPlanId, groupId, semesterId, subjectId }: GetMyActivitiesProps) => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getSession()

  if (error != null || data == null) {
    console.error('Error getting session:', error)
    throw new Error('Error getting session')
  }

  const { data: activities, error: errorActivities } = await supabase
    .from('activities')
    .select('id, name, desc, careers(id), education_plans(id), groups(id), semesters(id), type, created_at, deadline, is_open, subjects(id), questions(id, question, type, created_at, responses(id, option, is_correct))')
    .eq('professor', data.session?.user.id ?? '')
    .eq('careers.id', careerId)
    .eq('education_plans.id', educationPlanId)
    .eq('groups.id', groupId)
    .eq('semesters.id', semesterId)
    .eq('subjects.id', subjectId)

  if (errorActivities != null) {
    console.log('Error getting activities:', errorActivities)
    throw new Error('Error getting activities')
  }

  const activitiesWithFiles = await Promise.all(
    activities.map(async a => {
      const { data: files } = await supabase.storage.from('activities').list(a.id.toString())

      const formattedFiles = files?.map(f => ({
        ...f,
        url: supabase.storage.from('activities').getPublicUrl(`${a.id}/${f.name}`).data.publicUrl
      }))

      return {
        ...a,
        files: formattedFiles ?? []
      }
    })
  )

  return activitiesWithFiles
}

interface StartClassProps {
  groupId: number
  semesterId: number
  subjectId: number
  educationPlanId: number
  careerId: number
  subjectSlug: string
}

export const startClass = async ({ careerId, educationPlanId, groupId, semesterId, subjectId, subjectSlug }: StartClassProps) => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getSession()

  if (error != null || data == null) {
    console.error('Error getting session:', error)
    throw new Error('Error getting session')
  }

  const { error: errorLive } = await supabase.from('live-class').insert({
    career: careerId,
    group: groupId,
    plan: educationPlanId,
    semester: semesterId,
    subject: subjectId
  })

  if (errorLive != null) {
    console.error('Error starting class:', error)
    throw new Error('Error starting class')
  }

  await supabase.channel('live-class').send({
    event: 'start-class',
    type: 'broadcast',
    payload: {
      career: careerId,
      group: groupId,
      plan: educationPlanId,
      semester: semesterId,
      subject: subjectId,
      subjectSlug
    }
  })
}
