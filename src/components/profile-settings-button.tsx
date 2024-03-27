// import Logout from '@/app/student/components/navbar/logout'
import { UserWithRoles } from '@/services/supabase/types'

interface Props {
  user?: UserWithRoles | null
}

export const ProfileSettingsButton = async ({ user }: Props) => {
  return (
    <button className='text-[#394075] font-semibold capitalize flex items-center gap-2 bg-[#b0b0b0] rounded-lg px-3 py-1'>
      {user?.first_name}
      <img
        src='/user.svg' alt='logout' className='h-8'
      />
      {/* <Logout /> */}
    </button>
  )
}
