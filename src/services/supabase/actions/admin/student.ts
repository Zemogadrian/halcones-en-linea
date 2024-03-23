'use server'
import { z } from 'zod'
import { createClient } from '../../actions'
import { revalidatePath } from 'next/cache'

export const assignClass = async (formdata: FormData) => {
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

  revalidatePath(`/admin/students/view/${z.coerce.string().parse(data.student)}`)
}
