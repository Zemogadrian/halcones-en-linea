import { ProfileSettingsButton } from '@/components/profile-settings/profile-settings-button'
import { Days } from './days'
import { NavOptios } from './nav-options'
import { NavBarItem } from './types'
import { UserWithRoles } from '@/services/supabase/types'

interface Props {
  options: NavBarItem[]
  user?: UserWithRoles | null
}

export const NavBar = ({ options, user }: Props) => {
  return (
    <nav className=' flex flex-row h-16 select-none px-5 bg-[#cdcbcc] justify-between items-center'>
      <Days />
      <NavOptios options={options} />
      <ProfileSettingsButton user={user} />
    </nav>
  )
}
