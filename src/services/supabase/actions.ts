'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from 'database.types'
import { cookies } from 'next/headers'

import { foundUserRedirect } from '@/services/supabase/functions/utils'
import { redirect } from 'next/navigation'

export const createClient = async () => createServerActionClient<Database>({
  cookies: () => cookies()
})

export const login = async (email: string, password: string) => {
  const supabase = await createClient()

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error != null) {
    console.error('Error logging in:', error)
    throw new Error('Error logging in')
  }

  const { data: userData } = await supabase.from('user_data').select('roles(*)').eq('owner', data.user.id).single()

  const redirectUrl = foundUserRedirect(userData?.roles?.id ?? 0)

  console.log('Redirecting to:', redirectUrl, 'with user:', userData?.roles?.id ?? 0)

  redirect(redirectUrl)
}
