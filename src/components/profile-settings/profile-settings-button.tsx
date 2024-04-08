'use client'

import { UserWithRoles } from '@/services/supabase/types'
import { useRef } from 'react'
import styles from './style.module.css'
import LogoutButton from '../logout'
// import { AnimatePresence } from 'framer-motion'
// import { OptionContainer } from './option-container'
// import { useAnimatedSubmenuController } from '@/app/hooks/use-animated-submenu'

interface Props {
  user?: UserWithRoles | null
}

export const ProfileSettingsButton = ({ user }: Props) => {
  const $div = useRef<HTMLDivElement>(null)

  // const { alternate, isOpen, buttonId, deployEvents } = useAnimatedSubmenuController()

  // console.log('user', user)

  return (
    <div className='relative'>
      <button
        // id={buttonId}
        // onClick={alternate}
        className={`text-[#394075] font-semibold capitalize flex items-center gap-2 bg-[#b0b0b0] rounded-lg px-3 py-1 ${styles.button}`}
        onClick={() => {
          $div.current?.classList.toggle(styles['menu-open'])
        }}
      >
        {user?.first_name}
        <img
          src='/user.svg' alt='logout' className='h-8'
        />
      </button>
      <div
        ref={$div}
        className={`absolute top-12 right-0 bg-[#394075] rounded-lg shadow-md ${styles.menu}`}
      >
        <LogoutButton
          className='text-white w-full text-left hover:bg-[#b0b0b0] rounded-lg px-3 py-1 transition-colors'
        >
          Cerrar sesión
        </LogoutButton>
      </div>

      {/* <AnimatePresence>
      </AnimatePresence> */}
    </div>
  )
}
