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
  console.log(params)
  const classes = await getMyClasses(params.slug)
  console.log(classes)

  // const classesOption = {
  //   title: 'Materias',
  //   sub: classes?.educationPlans?.map(clas => ({
  //     title: clas.name,
  //     href: `/professor/${clas.slug}/activities`,
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
