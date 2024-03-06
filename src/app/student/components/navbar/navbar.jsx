import { getUser } from '@/services/supabase/actions'
import { Days } from './days'
import Logout from './logout'
import Link from 'next/link'

const CalAnimation = ({ children, href }) => {
  return (
    <Link href={href}>
      <button>
        {children}
      </button>
    </Link>
  )
}

export const NavBar = async () => {
  const user = await getUser()

  return (
    <div className=' flex flex-row h-16 select-none bg-[#42434565] justify-around'>
      <Days />
      <div className='flex text-xl  h-full justify-center'>
        <div className='flex flex-row w-full h-full justify-center'>
          <div>
            <CalAnimation href='/student/topics/subjects'>
              <p className='border-r-2 border-r-[#27316e] px-2 text-[#27316e] hover:text-[#fff] hover:bg-gradient-to-tr from-[#1f5186] to-[#131a2d] hover:rounded-lg'>Temas</p>
            </CalAnimation>
          </div>
          <div className=''>
            <CalAnimation href='/student/topics/documents'>
              <p className='border-r-2 border-r-[#27316e] px-2 text-[#27316e] hover:text-[#fff] hover:bg-gradient-to-tr from-[#1f5186] to-[#131a2d] hover:rounded-lg'>Documentación</p>
            </CalAnimation>
          </div>
          <div className=''>
            <CalAnimation href='/student/topics/activities'>
              <p className='border-r-2 border-r-[#27316e] px-2 text-[#27316e] hover:text-[#fff] hover:bg-gradient-to-tr from-[#1f5186] to-[#131a2d] hover:rounded-lg'>Actividades</p>
            </CalAnimation>
          </div>
          <div className=''>
            <CalAnimation href='/student/topics/exam'>
              <p className='border-r-2 border-r-[#27316e] px-2 text-[#27316e] hover:text-[#fff] hover:bg-gradient-to-tr from-[#1f5186] to-[#131a2d] hover:rounded-lg'>Examen</p>
            </CalAnimation>
          </div>
          <div className=''>
            <CalAnimation href='/student/topics/recordedclasses'>
              <p className='px-2 text-[#27316e] hover:text-[#fff] hover:bg-gradient-to-tr from-[#1f5186] to-[#131a2d] hover:rounded-lg'>Clases grabadas</p>
            </CalAnimation>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        {/* <img src='/user.svg' alt='user' className='h-8' /> */}
        <Logout />
        <button className='text-white font-semibold mr-4 capitalize'>{user?.first_name}</button>
      </div>
    </div>
  )
}
