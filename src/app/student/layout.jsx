import { NavBar } from '@/app/student/components/navbar/navbar'
import { options } from './components/sidebar/data'
import { DistroNavASide } from '../layouts/distro-nav-aside'
import { getMySubjects } from '@/services/supabase/actions/students'

export default async function AlumnLayout ({ children }) {
  const subjects = await getMySubjects()
  const materiasOption = {
    title: 'Materias',
    sub: subjects.map(subject => ({
      title: subject.name,
      href: `/student/subject/${subject.id}`,
      type: 'subject-section',
      defaultRef: 'topics'
    }))
  }

  const newOptios = [materiasOption, ...options]

  return (
    <DistroNavASide
      navbar={<NavBar />}
      options={newOptios}
    >
      {children}
    </DistroNavASide>
  )
}
