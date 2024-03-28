import { DistroNavASide } from '@/app/layouts/distro-nav-aside'
import { getMyClasses } from '@/services/supabase/actions/professors'
import { constructSideBarOptions } from '@/components/sidebar/utils/add-side-bar-option'
import { SideBarOptions } from '@/components/sidebar/types'
import { NavBarProf } from '@/app/student/components/navbar/variants/professor'
import { getUser } from '@/services/supabase/actions/auth'
import { queryParamsSections, subjectRefs } from './enums'

interface Props {
  params: {
    slug: string
  }
  children: string
}

export default async function Layout ({ children, params }: Props) {
  const career = await getMyClasses(params.slug)
  const user = await getUser()
  console.log(career)

  const options = constructSideBarOptions(
    career.educationPlans.reduce((acc, plan) => {
      const elements = plan.groups.reduce((acc, group) => {
        const elements = group.semesters.reduce((acc, semester) => {
          const elements: SideBarOptions = semester.subjects.map(subject => ({
            title: `${semester.number}° SEMESTRE - GRUPO ${group.name} (PLAN - ${plan.id})`,
            sub: [{
              title: `${subject.name}`,
              href: `/professor/career/${params.slug}/${subject.slug ?? ''}`,
              type: queryParamsSections.professorSubject,
              defaultRef: subjectRefs.schedule
            }]
          }))
          return [...acc, ...elements]
        }, [])
        return [...acc, ...elements]
      }, [])

      return [...acc, ...elements]
    }, [])
  )
  return (
    <DistroNavASide
      navbar={<NavBarProf user={user} />}
      options={options}
    >
      {children}
    </DistroNavASide>
  )
}
