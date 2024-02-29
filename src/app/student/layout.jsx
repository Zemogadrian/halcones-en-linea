import { NavBar } from '@/app/student/components/navbar/navbar'
import SideBar from './components/sidebar/sidebar'

export default function AlumnLayout ({ children }) {
  return (
    <div className='h-dvh flex flex-col'>
      <NavBar />
      <div className='flex flex-1'>
        <div className='flex w-1/4'>
          <SideBar />
        </div>
        {children}
      </div>
    </div>
  )
}
