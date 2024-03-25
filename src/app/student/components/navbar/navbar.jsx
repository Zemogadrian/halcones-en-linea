import { Days } from './days'
import Logout from './logout'
import { CalAnimation } from './calAnimation'
// import { options } from '../../../student/components/sidebar/data'
import { getUser } from '@/services/supabase/actions/auth'

export const NavBar = async ({ handleClick }) => {
  const user = await getUser()
  // const hasMaterias = options.some(option => option.title === 'Materias')

  return (
    <nav className=' flex flex-row h-16 select-none bg-[#cdcbcc] justify-around items-center'>
      <Days />
      <section className='flex flex-row text-xl h-full justify-center '>
        {/* {!hasMaterias &&
        } */}
        <CalAnimation />
      </section>
      <section className='flex items-center gap-2 bg-[#b0b0b0] rounded-lg px-3 py-1'>
        <button className='text-[#394075] font-semibold capitalize'>{user?.first_name}</button>
        <Logout />
      </section>
    </nav>
  )
}
