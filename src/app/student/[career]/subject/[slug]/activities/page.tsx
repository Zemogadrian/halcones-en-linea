import { UploadFileIcon } from '@/assets/icons'
import { getMyActivities } from '@/services/supabase/actions/activities'
import { getUser } from '@/services/supabase/actions/auth'
import { v4 } from '@/utils/uuid'
// import { ActivityDisplay } from '../../../components/students/display-activities'

export default async function StudentPage ({ params, searchParams }) {
  const user = await getUser()

  if (user == null) {
    console.error('Error getting user')
    throw new Error('Error getting user')
  }

  const { owner } = user

  const activities = await getMyActivities({
    careerId: parseInt(searchParams.careerId),
    semesterId: parseInt(searchParams.semesterId),
    groupId: parseInt(searchParams.groupId),
    educationPlanId: parseInt(searchParams.educationPlanId),
    subjectId: parseInt(searchParams.subjectId),
    studentId: owner ?? undefined
  })

  const filteredActivities = activities

  console.log(filteredActivities)

  return (
    <main className='flex flex-col gap-2'>
      <section className='flex justify-end'>
        <select>
          <option>Entregadas</option>
          <option>No entregadas</option>
        </select>
      </section>
      <section className=''>
        {/* <ActivityDisplay /> */}

        {
          filteredActivities.map((a, i) => (
            <article key={v4()}>

              <header className='flex text-white'>
                <span>
                  Actividad {i + 1}
                </span>

                <div>
                  <UploadFileIcon className='w-24' />
                </div>
              </header>

            </article>
          ))
        }

      </section>
    </main>
  )
}
