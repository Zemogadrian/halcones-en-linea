'use client'

// import { logout } from '@/services/supabase/actions/auth'

export default function LogoutButton (props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
    >
      {props.children}
    </button>
  )
}
