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
  const mySubjects = await getMySubjects(decodeURIComponent(params.career))
  const user = await getUser()

  const materiasOption: SideBarOption = {
    title: 'Materias',
    sub: mySubjects.subjects.map(subject => ({
      title: subject.name,
      href: `/student/${params.career}/subject/${subject.slug}`,
      type: queryParamsSections.subjectSection,
      defaultRef: subjectRefs.topics,
      queryParams: {
        subjectId: subject.id.toString() ?? '',
        semesterId: mySubjects.semester?.id.toString() ?? '',
        groupId: mySubjects.group?.id.toString() ?? '',
        educationPlan: mySubjects.educationPlan?.id.toString() ?? ''
      }
    }))
  }

  const newOptions = addSideBarOption(options, 0, materiasOption)

  return (
    <DistroNavASide
      navbar={<NavBarStudent user={user} />}
      options={newOptions}
    >
      {children}
    </DistroNavASide>
  )
}
