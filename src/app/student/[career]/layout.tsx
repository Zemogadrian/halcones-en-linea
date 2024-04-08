import { options } from './components/sidebar/data'
import { DistroNavASide } from '@/app/layouts/distro-nav-aside'
import { getMySubjects } from '@/services/supabase/actions/students'
import { SideBarOption } from '@/components/sidebar/types'
import { addSideBarOption } from '@/components/sidebar/utils/add-side-bar-option'
import { getUser } from '@/services/supabase/actions/auth'
import { queryParamsSections, subjectRefs } from './enums'
import { NavBarStudent } from '@/components/navbar/variants/alumn'

interface Props {
  children: React.ReactNode
  params: {
    career: string
  }
}

export default async function AlumnLayout ({ children, params }: Props) {
  const subjects = await getMySubjects(decodeURIComponent(params.career))
  const user = await getUser()

  const materiasOption: SideBarOption = {
    title: 'Materias',
    sub: subjects.map(subject => ({
      title: subject.name,
      href: `/student/subject/${subject.slug}`,
      type: queryParamsSections.subjectSection,
      defaultRef: subjectRefs.topics
    }))
  }

  const newOptios = addSideBarOption(options, 0, materiasOption)

  return (
    <DistroNavASide
      navbar={<NavBarStudent user={user} />}
      options={newOptios}
    >
      {children}
    </DistroNavASide>
  )
}
