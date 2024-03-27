import { ProfileSettingsButton } from '@/components/profile-settings-button'
import { Days } from './days'
import { NavOptios } from './nav-options'

export const NavBar = async ({ handleClick }) => {
  // const hasMaterias = newOptios.some(option => option.title === 'Materias')

  return (
    <nav className=' flex flex-row h-16 select-none px-5 bg-[#cdcbcc] justify-between items-center'>
      <Days />
      <NavOptios />
      <ProfileSettingsButton />
    </nav>
  )
}
