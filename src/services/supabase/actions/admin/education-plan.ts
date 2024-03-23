'use server'
import { z } from 'zod'
import { extractSemesters, filterSemestersToAdd, filterSemestersToDelete, filterSemestersToUpdate, filterSubjectsToAdd, filterSubjectsToDelete } from '../../utils/create-education-plan'
import { getSubjects } from '../subjects'
import { createClient } from '../../actions'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { EducationPlan } from '../../types'

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
