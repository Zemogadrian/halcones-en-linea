import { SideBar } from './components/sidebar/side-bar.component'
import { routes } from './components/sidebar/data'

export default function AlumnLayout ({ children }) {
  return (
    <>
      <header />

      <div className='flex'>
        <SideBar routes={routes} />
        {children}
      </div>

    </>
  )
}
