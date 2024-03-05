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

export const logout = async () => {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error != null) {
    console.error('Error logging out:', error)
    throw new Error('Error logging out')
  }

  redirect('/login')
}

export const getUser = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getSession()

  if (error != null || data?.session == null) {
    console.error('Error getting user:', error)
    throw new Error('Error getting user')
  }

  const { data: userData } = await supabase.from('user_data').select('*, roles(*)').eq('owner', data.session.user.id).single()

  return userData
}

export const getSubjects = async () => {
  return []
}

export const getTopics = async () => {
  return []
}

export const getCampuses = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('campus').select('*')

  if (error != null) {
    console.error('Error getting campuses:', error)
    throw new Error('Error getting campuses')
  }

  return data
}

export const getEducationPlans = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('education_plans').select('*')

  if (error != null) {
    console.error('Error getting education plans:', error)
    throw new Error('Error getting education plans')
  }

  return data
}
