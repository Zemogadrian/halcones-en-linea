import Link from 'next/link'
import { GetActivities } from './get-activities'
import { getMyActivities, getMyStudents } from '@/services/supabase/actions/professors'

export default async function Activities ({ params, searchParams }) {
  console.log(params, searchParams)
  const newSearchParams = new URLSearchParams(searchParams)

  const myStudents = await getMyStudents({
    careerId: searchParams.careerId,
    educationPlanId: searchParams.educationPlanId,
    groupId: searchParams.groupId,
    semesterId: searchParams.semesterId
  })

  console.log(myStudents)

  const activities = await getMyActivities({
    careerId: searchParams?.careerId,
    subjectId: searchParams?.subjectId,
    educationPlanId: searchParams?.educationPlanId,
    groupId: searchParams?.groupId,
    semesterId: searchParams?.semesterId
  })

  return (
    <main className='flex flex-col gap-5'>
      <header className='flex flex-row gap-2'>
        <div className='bg-white text-[#21264a] rounded-md px-2'>
          Mis actividades
        </div>
        <Link
          href={`/professor/create-activity?${newSearchParams.toString()}`}
        >
          <div className='text-white bg-[#1264ac] rounded-full justify-center items-center flex w-7 h-7'>+</div>
        </Link>
      </header>
      <GetActivities activities={activities} params={params} searchParams={searchParams} />
    </main>
  )
}
