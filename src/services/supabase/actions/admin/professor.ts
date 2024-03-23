'use server'
import { z } from 'zod'
import { createClient } from '../../actions'
import { revalidatePath } from 'next/cache'

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
