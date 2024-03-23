'use server'
import { createClient } from '../actions'

export const getCareers = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('careers').select('id, name, rvoe, created_at, campus(id, name)')

  if (error != null) {
    console.error('Error getting careers:', error)
    throw new Error('Error getting careers')
  }

  return data
}

export const getReducedCareers = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('careers').select('id, name, campus(id, name)')

  if (error != null) {
    console.error('Error getting careers:', error)
    throw new Error('Error getting careers')
  }

  return data
}
