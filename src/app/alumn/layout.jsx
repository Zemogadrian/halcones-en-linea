import { SideBar } from './components/sidebar/side-bar.component'
import { routes } from './components/sidebar/data'
import { NavBar } from '@/app/alumn/components/navbar/navbar'

export default function AlumnLayout ({ children }) {
  return (
    <>
      <NavBar />
      <div className='flex'>
        <SideBar routes={routes} />
        {children}
      </div>
    </>
  )
}
