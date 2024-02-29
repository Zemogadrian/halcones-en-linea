'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from 'database.types'
import { cookies } from 'next/headers'

export const createClient = () => createServerActionClient<Database>({
  cookies: () => cookies()
})
