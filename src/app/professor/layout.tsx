import { ProfileSettingsButton } from '@/components/profile-settings-button'
import { DistroNav } from '../layouts/distro-nav'

export default function Layout ({
  children
}) {
  return (
    <DistroNav
      navbar={
        <nav
          className='bg-nav-bg p-2 flex justify-between items-center'
        >
          <img
            className='aspect-[24/9] w-28'
            src='/img/logo-itesus.png' alt='Logo de itesus'
          />

          <ProfileSettingsButton />
        </nav>
      }
      options={[]}
    >
      {children}
    </DistroNav>
  )
}
