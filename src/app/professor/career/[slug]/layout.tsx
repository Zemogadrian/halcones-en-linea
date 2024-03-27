import { DistroNavASide } from '@/app/layouts/distro-nav-aside'
import { NavBarProf } from '../../components/navbar/navbar'
import { getMyClasses } from '@/services/supabase/actions/professors'

interface Props {
  params: {
    slug: string
    name: string
    id: number
  }
  children: string
}

export default async function Layout ({ children, params }: Props) {
  const classes = await getMyClasses(params.slug)
  console.log(classes)

  // const classesOption = {
  //   classes?.map(clas =>
  //     clas.educationPlans?.map(plan =>
  //       plan.groups?.map(group =>
  //         group.semesters?.map(semester =>
  //           semester.subjects?.map(subject => ({
  //             title: `${semester.number}° SEMESTRE - GRUPO ${group.name} (PLAN - ${plan.id})`,
  //             sub:{
  //               title:`${subject.name}`,
  //               href: `/professor/${clas.slug}/${subject.name}/activities`
  //             }
  //           }))))))
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
