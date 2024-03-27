import { Main } from '@/components/utils'
import { getMyClasses } from '@/services/supabase/actions/professors'

interface Props {
  params: {
    slug: string
  }
}

export default async function CareerPage ({ params }: Props) {
  console.log(params)

  const classes = await getMyClasses(params.slug)

  console.log(classes)

  return (
  // <Main>
  //   <div className='text-green-200'>
  //     {classes?.map(clas => (
  //       <div key={clas.id}>
  //         <p>{clas?.educationPlans?.} SEMESTRE - GRUPO (PLAN- {clas?.educationPlans?.id})</p>
  //         {/* {clas.educationPlans?.map(plan => (
  //           <div key={plan.id} className='text-green-400'>
  //             <p>{plan.name}</p>
  //             <p>{plan.id}</p>
  //             {plan.groups?.map(group => (
  //               <div key={group.id} className='text-green-700'>
  //                 <p>{group.name}</p>
  //                 <p>{group.id}</p>
  //                 {group.semesters?.map(semester => (
  //                   <div key={semester.id} className='text-green-900'>
  //                     <p>{semester.name}</p>
  //                     <p>{semester.id}</p>
  //                     {semester.subjects?.map(subject => (
  //                       <div key={subject.id} className='text-green-900'>
  //                         <p>{subject.name}</p>
  //                         <p>{subject.id}</p>
  //                       </div>
  //                     ))}
  //                   </div>
  //                 ))}
  //               </div>
  //             ))}
  //           </div>
  //         ))} */}
  //       </div>
  //     ))}
  //   </div>
  // </Main>
    <Main>
      <div className='text-white'>
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
      </div>
    </Main>
  )
}
