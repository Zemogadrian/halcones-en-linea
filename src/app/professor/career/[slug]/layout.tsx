import { DistroNavASide } from '@/app/layouts/distro-nav-aside'
import { NavBarProf } from '../../components/navbar/navbar'

export default function Layout ({ children }) {
  // const materiasOption = {
  //   title: 'Materias',
  //   sub: subjects.map(subject => ({
  //     title: subject.name,
  //     href: `/student/subject/${subject.id}`,
  //     type: 'subject'
  //   }))
  // }
  return (
    <DistroNavASide
      navbar={<NavBarProf />}
      options={[]}
    >
      {children}
    </DistroNavASide>
  )
}
