import { Main } from '@/components/utils'
// import { getMyClasses } from '@/services/supabase/actions/professors'

interface Props {
  params: {
    slug: string
  }
}

export default async function CareerPage ({ params }: Props) {
  // const classes = await getMyClasses(params.slug)

  return (

    <Main>
      {/* <div className='text-white'>
        {classes?.map(clas =>
          clas.educationPlans?.map(plan =>
            plan.groups?.map(group =>
              group.semesters?.map(semester =>
                semester.subjects?.map(subject => (
                  <div key={`${clas.id}-${plan.id}-${group.id}-${semester.id}-${subject.id}`} className='text-white'>
                    <p>{semester.number}° SEMESTRE - GRUPO {group.name} (PLAN - {plan.id})</p>
                  </div>
                ))
              )
            )
          )
        )}
      </div> */}
    </Main>
  )
}
