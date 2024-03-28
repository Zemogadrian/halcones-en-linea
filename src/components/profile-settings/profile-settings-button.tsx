'use client'

import { UserWithRoles } from '@/services/supabase/types'
import { AnimatePresence } from 'framer-motion'
import { OptionContainer } from './option-container'
import { useAnimatedSubmenuController } from '@/app/hooks/use-animated-submenu'

interface Props {
  user?: UserWithRoles | null
}

export const ProfileSettingsButton = ({ user }: Props) => {
  const { alternate, isOpen, buttonId, deployEvents } = useAnimatedSubmenuController()

  return (
    <div className='relative'>
      <button
        id={buttonId}
        onClick={alternate}
        className='text-[#394075] font-semibold capitalize flex items-center gap-2 bg-[#b0b0b0] rounded-lg px-3 py-1'
      >
        {user?.first_name}
        <img
          src='/user.svg' alt='logout' className='h-8'
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <OptionContainer deployEvents={deployEvents} />
        )}
      </AnimatePresence>
    </div>
  )
}
