'use client'

import { logout } from '@/services/supabase/actions/auth'

// import { logout } from '@/services/supabase/actions/auth'

export default function LogoutButton (props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={() => {
        logout()
          .catch((error) => {
            console.log(error)
          })
      }}
      {...props}
    >
      {props.children}
    </button>
  )
}
