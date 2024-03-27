import { options } from './components/sidebar/data'
import { DistroNavASide } from '../layouts/distro-nav-aside'
import { getMySubjects } from '@/services/supabase/actions/students'
import { SideBarOption } from '@/components/sidebar/types'
import { addSideBarOption } from '@/components/sidebar/utils/add-side-bar-option'
import { NavBarStudent } from './components/navbar/variants/alumn'
import { getUser } from '@/services/supabase/actions/auth'

export const enum subjectRefs {
  topics = 'topics',
  documents = 'documents',
  activities = 'activities',
  exam = 'exam',
  recordedclasses = 'recordedclasses',
}

export const enum queryParamsSections {
  subjectSection = 'subject-section',
}

export default async function AlumnLayout ({ children }) {
  const subjects = await getMySubjects()
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
