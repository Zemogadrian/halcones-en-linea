import { ProfileSettingsButton } from '@/components/profile-settings/profile-settings-button'
import { NavProfOptions } from './navbarProfessor'
import { Carrer } from './carrer'

export const NavBarProf = () => {
  return (
    <nav className=' flex flex-row h-16 select-none px-5 bg-[#cdcbcc] justify-around items-center'>
      <Carrer />
      <NavProfOptions />
      <ProfileSettingsButton />
    </nav>
  )
}
