import Logout from '@/app/student/components/navbar/logout'
import { getUser } from '@/services/supabase/actions/auth'

export const ProfileSettingsButton = async () => {
  const user = await getUser()

  return (
    <section className='flex items-center gap-2 bg-[#b0b0b0] rounded-lg px-3 py-1'>
      <button className='text-[#394075] font-semibold capitalize'>{user?.first_name}</button>
      <Logout />
    </section>
  )
}
