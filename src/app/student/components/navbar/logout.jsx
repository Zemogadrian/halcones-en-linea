'use client'

import { logout } from '@/services/supabase/actions/auth'

export default function Logout () {
  return (
    <button>
      <img src='/user.svg' alt='logout' className='h-8' onClick={() => logout()} />
    </button>
  )
}
