'use server'
import { revalidatePath } from 'next/cache'
import { createClient } from '../../actions'
import { redirect } from 'next/navigation'
import { z } from 'zod'

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
