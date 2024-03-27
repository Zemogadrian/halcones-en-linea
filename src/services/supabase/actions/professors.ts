'use server'
import { createClient } from '../actions'
import { USER_TYPES } from '../functions/types'

export const getProfessors = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('user_data').select('*').eq('role', USER_TYPES.PROFESSOR)

  if (error != null) {
    console.error('Error getting professors:', error)
    throw new Error('Error getting professors')
  }

  return data
}

export const getMyClasses = async (slug) => {

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
