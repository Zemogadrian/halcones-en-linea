import { Days } from './days'
import Logout from './logout'
import { CalAnimation } from './calAnimation'
import { getUser } from '@/services/supabase/actions/auth'
import { getCookie } from '@/services/actions'

export const NavBar = async ({ isMateriasSelected }) => {
  const user = await getUser()
  const calNav = await getCookie('calNav')

  console.log(calNav)
  return (
    <nav className=' flex flex-row h-16 select-none bg-[#cdcbcc] justify-around items-center'>
      <Days />
      <section className='flex flex-row text-xl h-full justify-center '>
        {isMateriasSelected && <CalAnimation />}
      </section>
      <section className='flex items-center gap-2 bg-[#b0b0b0] rounded-lg px-3 py-1'>
        <button className='text-[#394075] font-semibold capitalize'>{user?.first_name}</button>
        <Logout />
      </section>
    </nav>
  )
}
