// import { UploadFileIcon } from '@/assets/icons'
import { getMyActivities } from '@/services/supabase/actions/activities'
import { getUser } from '@/services/supabase/actions/auth'
import { DisplayActivity } from './components/display-activity'
import { v4 } from '@/utils/uuid'
import { UploadFileModal } from './components/upload-file-modal'
// import { v4 } from '@/utils/uuid'
// import { ActivityDisplay } from '../../../components/students/display-activities'

const TYPES = {
  trivia: 'Trivia',
  exam: 'Examen',
  work: 'Trabajo',
  questionary: 'Cuestionario'
}

export default async function ActivityPage ({ searchParams }) {
  console.log(searchParams)

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
      <UploadFileModal
        open={searchParams?.upload === 'true'}
        activityId={searchParams.activityId}
      />
      <section className='flex justify-end'>
        <select>
          <option>Entregadas</option>
          <option>No entregadas</option>
        </select>
      </section>
      <section className='flex flex-col gap-5'>
        {
          filteredActivities.map((a, i) => (
            <DisplayActivity
              id={a.id}
              key={v4()}
              number={i + 1}
              deadline={new Date(a.deadline)}
              status={a.studentInfo != null ? 'Entregada' : 'No entregada'}
              topic={a.name}
              description={a.desc ?? undefined}
              requiredFile={a.type === 'work'}
              type={{
                label: TYPES[a.type],
                value: a.type
              }}
            />
          ))
        }

      </section>
    </main>
  )
}
