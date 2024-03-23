'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from 'database.types'
import { cookies } from 'next/headers'

export async function createClient () {
  const cookiesStore = cookies()

  return createServerActionClient<Database>({
    cookies: () => cookiesStore
  })
}
