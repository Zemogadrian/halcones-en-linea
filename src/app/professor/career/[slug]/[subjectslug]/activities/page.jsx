import Link from 'next/link'
import { GradeActivity } from './grade-activity'
import { getMyActivities } from '@/services/supabase/actions/professors'

export default async function Activities ({ params, searchParams }) {
  console.log(params, searchParams)
  const newSearchParams = new URLSearchParams(searchParams)

  const activities = await getMyActivities({
    careerId: searchParams.careerId,
    subjectId: searchParams.subjectId,
    educationPlanId: searchParams.educationPlanId,
    groupId: searchParams.groupId,
    semesterId: searchParams.semesterId
  })

  console.log(activities)

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-row gap-2'>
        <div className='bg-white text-[#21264a] rounded-md px-2'>
          Mis actividades
        </div>
        <Link
          href={`/professor/create-activity?${newSearchParams.toString()}`}
        >
          <div className='text-white bg-[#1264ac] rounded-full justify-center items-center flex w-7 h-7'>+</div>
        </Link>
      </div>
      <section className='grid grid-cols-2 grid-flow-row h-full w-full gap-10 px-20 '>
        <Link href={`/professor/career/${params.slug}/${params.subjectslug ?? ''}/activities`}>
          <div className='gap-5 flex flex-row h-[10rem] w-[30rem]'>
            <img src='/actividad.png' alt='activity' className='h-[4rem]' />
            <div className='bg-[#ccccca] flex w-full h-full flex-col text-start gap-5 rounded-lg p-3'>
              <h2 className='text-[#1e244b] underline text-xl'>Fotografía publitaria</h2>
              <span className='text-[#1e244b] text-lg'>Realizar 5 fotos con elemento humano, destacando el producto o servicio</span>
              <span className='text-[#1e244b] underline text-end'>Trabajo- 30 de abril de 2024</span>
            </div>
          </div>
        </Link>
      </section>
      <GradeActivity />
    </div>
  )
}
