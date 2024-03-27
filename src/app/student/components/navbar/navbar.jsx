import { ProfileSettingsButton } from '@/components/profile-settings-button'
import { Days } from './days'
import { NavOptios } from './nav-options'
import { getUser } from '@/services/supabase/actions/auth'

export const NavBar = async () => {
  const user = await getUser()

  return (
    <nav className=' flex flex-row h-16 select-none px-5 bg-[#cdcbcc] justify-between items-center'>
      <Days />
      <NavOptios />
      <ProfileSettingsButton user={user} />
    </nav>
  )
}
