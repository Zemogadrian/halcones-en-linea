import { ActivityDisplay } from '../../../components/students/display-activities'

export default async function StudentPage (props) {
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
