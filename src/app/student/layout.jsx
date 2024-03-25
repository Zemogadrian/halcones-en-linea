import { NavBar } from '@/app/student/components/navbar/navbar'
import { options } from './components/sidebar/data'
import { DistroNavASide } from '../layouts/distro-nav-aside'
import { getMySubjects } from '@/services/supabase/actions/students'
import { getCookie } from '@/services/actions'

export default async function AlumnLayout ({ children }) {
  const calNav = await getCookie('calNav')

  const subjects = await getMySubjects()

  const materiasOption = {
    title: 'Materias',
    sub: subjects.map(subject => ({
      title: subject.name,
      href: `/student/subject/${subject.id}/${calNav?.value ?? 'topics'}`
    }))
  }
  const newOptios = [materiasOption, ...options]
  return (
    <DistroNavASide
      navbar={<NavBar isMateriasSelected />}
      options={newOptios}
    >
      {children}
    </DistroNavASide>
  )
}
