import { NavBar } from '@/app/student/components/navbar/navbar'
import { SideBarV2 } from './components/sidebar/sidebar'

export default function AlumnLayout ({ children }) {
  return (
    <div className='h-dvh flex flex-col'>
      <NavBar />
      <div className='flex flex-1'>
        {/* <div className='flex w-1/4'> */}
        <SideBarV2 />
        {/* </div> */}
        <div className='flex-1 h-full'>
          {children}
        </div>
      </div>
    </div>
  )
}
