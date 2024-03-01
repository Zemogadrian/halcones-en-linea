import { NavBar } from '@/app/student/components/navbar/navbar'
import { options } from './components/sidebar/data'
import { DistroNavASide } from '../layouts/distro-nav-aside'

export default function AlumnLayout ({ children }) {
  return (
    <DistroNavASide
      navbar={<NavBar />}
      options={options}
    >
      {children}
    </DistroNavASide>
  )
}
