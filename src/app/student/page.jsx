import SideBar from './components/sidebar/sidebar'
import DisplayActivities from './components/students/display-activities'

export default async function Alumn () {
  return (
    <main className='bg-gradient-to-tr from-[#1f5186] to-[#131a2d] w-full overflow-y-hidden flex flex-row'>
      <SideBar />
      <section className='p-28 w-full'>
        <DisplayActivities />
      </section>
      <section className='p-14'>
        <select>
          <option>Entregadas</option>
          <option>No entregadas</option>
        </select>
      </section>
    </main>
  )
}
