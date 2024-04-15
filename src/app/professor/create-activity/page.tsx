import { DistroNav } from '@/app/layouts/distro-nav'
import { ProfileSettingsButton } from '@/components/profile-settings/profile-settings-button'
import { H1, Main } from '@/components/utils'
import { getUser } from '@/services/supabase/actions/auth'
import { SliderBox } from './components/slider-box'
import { ActivitySection } from './components/activity-section'

export default async function CreateActivityPage () {
  const user = await getUser()

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

          <ProfileSettingsButton user={user} />
        </nav>
      }
    >
      <Main
        className='w-full flex flex-col max-w-6xl mx-auto px-4'
      >

        <header
          className='border-b pb-4 px-14 mb-10'
        >
          <H1
            className='text-[#cdcccb] border-b w-fit'
          >
            Crea tu actividad
          </H1>

          <span className='text-white font-bold text-lg'>
            Selecciona la actividad a crear para la trivia
          </span>
        </header>

        <ActivitySection />

        <SliderBox />

      </Main>
    </DistroNav>
  )
}
