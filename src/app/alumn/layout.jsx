import { SideBar } from './components/sidebar/side-bar.component'
import { routes } from './components/sidebar/data'
import StudentNavBar from '@/components/students/studentsNavBar'

export default function AlumnLayout ({ children }) {
  return (
    <>
      <StudentNavBar />
      <div className='flex'>
        <SideBar routes={routes} />
        {children}
      </div>
    </>
  )
}
