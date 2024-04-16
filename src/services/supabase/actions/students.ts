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

interface IsClassOnlineProps {
  carrerId: number
  educationPlanId: number
  groupId: number
  semesterId: number
}

export const isClassOnline = async ({ carrerId, educationPlanId, groupId, semesterId }: IsClassOnlineProps) => {
  const supabase = await createClient()

  const twoHoursAgo = new Date()
  twoHoursAgo.setHours(twoHoursAgo.getHours() - 2)

  const { data, error } = await supabase
    .from('live-class')
    .select('subject')
    .eq('career', carrerId)
    .eq('plan', educationPlanId)
    .eq('group', groupId)
    .eq('semester', semesterId)
    .gte('created_at', twoHoursAgo.toISOString())
    .order('created_at', { ascending: false })
    .single()

  console.log('Data:', data)

  if (error != null) {
    console.log('Error getting live class:', error)
    throw new Error('Error getting live class')
  }

  return data
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

export const getMyReducedCareers = async () => {
  const supabase = await createClient()

  const { data: userData, error: userError } = await supabase.auth.getSession()

  if (userError != null || userData == null) {
    console.error('Error getting session:', userError)
    throw new Error('Error getting session')
  }

  const { data, error } = await supabase.from('student_config').select('careers(id, name, slug), education_plans(id, name), semesters(id, number), groups(id, name)').eq('owner', userData?.session?.user.id ?? '')

  if (error != null) {
    console.error('Error getting student careers:', error)
    throw new Error('Error getting student careers')
  }

  return data.map(c => ({
    ...c.careers,
    educationPlan: c.education_plans,
    actualSemester: {
      id: c.semesters?.id,
      number: c.semesters?.number
    },
    group: c.groups
  }))
}

export const getMySubjects = async (careerSlug: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getSession()

  if (error != null || data.session == null) {
    console.error('Error getting session:', error)
    throw new Error('Error getting session')
  }

  const userId = data.session.user.id

  const { data: studentData, error: studentError } = await supabase.from('student_config').select('semesters(id, number, semester_subjects(subjects(*))), careers(id, name, slug), groups(id, name), education_plans(id, name)').eq('owner', userId).eq('careers.slug', careerSlug)

  const filteredStudentData = studentData?.filter(sc => sc.careers)

  console.log('filteredStudentData:', filteredStudentData)

  if (studentError != null) {
    console.log('Error getting student subjects:', studentError)
    throw new Error('Error getting student subjects')
  }

  const subjects = SubjectWithCreatedDate.array().parse(
    (filteredStudentData?.map(s => s.semesters?.semester_subjects.map(ss => ss.subjects)) ?? []).flat()
  )

  return {
    group: filteredStudentData?.[0].groups,
    career: filteredStudentData?.[0].careers,
    educationPlan: filteredStudentData?.[0].education_plans,
    semester: filteredStudentData?.[0].semesters,
    subjects
  }
}

interface GetNyActivities {
  groupId: number
  semesterId: number
  careerId: number
  subjectId: number
  educationPlanId: number
  filters?: {
    open: boolean
    close: boolean
    sent: boolean
    noSent: boolean
    qualified: boolean
    noQualified: boolean
    approved: boolean
    rejected: boolean
  }
}

export const getMyActivies = async ({ careerId, educationPlanId, groupId, semesterId, subjectId, filters }: GetNyActivities) => {
  const supabase = await createClient()

  const { data: userData, error: userError } = await supabase.auth.getSession()

  if (userError != null || userData == null) {
    console.error('Error getting session:', userError)
    throw new Error('Error getting session')
  }

  const { data, error } = await supabase
    .from('activities')
    .select('id, type, name, desc, deadline, is_open, user_data(id, first_name, last_name), questions(id, question, type, accept_file, responses(id, option, is_correct))')
    .eq('careers.id', careerId)
    .eq('education_plans.id', educationPlanId)
    .eq('groups.id', groupId)
    .eq('semesters.id', semesterId)
    .eq('subjects.id', subjectId)
    .eq('is_open', filters?.open ?? true)
    .eq('is_open', !(filters?.close ?? true))

  if (error != null || data == null) {
    console.error('Error getting activities:', error)
    throw new Error('Error getting activities')
  }

  const activities = await Promise.all(data.map(async a => {
    const { data: studentActivity } = await supabase
      .from('student_activities')
      .select('id, created_at, is_sent, is_qualified, is_approved')
      .eq('activity', a.id)
      .eq('student', userData.session?.user.id ?? '')
      .eq('is_sent', filters?.sent ?? true)
      .eq('is_sent', !(filters?.noSent ?? true))
      .eq('is_qualified', filters?.qualified ?? true)
      .eq('is_qualified', !(filters?.noQualified ?? true))
      .eq('is_approved', filters?.approved ?? true)
      .eq('is_approved', !(filters?.rejected ?? true))
      .single()

    const { data: files } = await supabase.storage.from(`activities/${a.id}`).list()

    return ({
      ...a,
      ...studentActivity,
      id: a.id,
      studentActivityId: studentActivity?.id,
      files: files ?? []
    })
  }))

  return activities
}

interface Event {
  type: 'broadcast'
  event: string
  payload: {
    career: number
    plan: number
    group: number
    semester: number
    subject: number
    subjectSlug: string
  }
}

export const listenStartLiveClass = async () => {
  const supabase = await createClient()

  console.log('Listening to start live class')

  return await new Promise<Event>((resolve) => {
    supabase.channel('live-class').on('broadcast', {
      event: 'start-class'
    }, (e) => {
      resolve(e as Event)
    })
      .subscribe()
  })
}
