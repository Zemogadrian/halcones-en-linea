import { ActivityDisplay } from '../../../components/students/display-activities'

interface Props {
  params: {
    career: string
    slug: string
  }

  searchParams: {
    careerId: string
    semesterId: string
    groupId: string
    educationPlanId: string
    subjectId: string
  }
}

export default async function StudentPage ({ searchParams }: Props) {
  return (
    <main className='flex flex-col gap-2'>
      <section className='flex justify-end'>
        <select>
          <option>Entregadas</option>
          <option>No entregadas</option>
        </select>
      </section>

      <section className=''>
        <ActivityDisplay />
      </section>
    </main>
  )
}
