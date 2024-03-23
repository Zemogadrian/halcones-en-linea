'use server'
import { revalidatePath } from 'next/cache'
import { createClient } from '../../actions'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export const createCareer = async (data: FormData) => {
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
