import { NavBar } from '@/app/student/components/navbar/navbar'
import { options } from './components/sidebar/data'
import { DistroNavASide } from '../layouts/distro-nav-aside'
import { getMySubjects } from '@/services/supabase/actions/students'

export default async function AlumnLayout ({ children }) {
  const subjects = await getMySubjects()

  console.log(subjects)

  return (
    <DistroNavASide
      navbar={<NavBar />}
      options={options}
    >
      {children}
    </DistroNavASide>
  )
}
