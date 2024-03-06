import ShowClassesRecorded from '../../components/students/recorded-clases'

export default function RecordedClasses () {
  return (
    <main className='bg-gradient-to-tr from-[#1f5186] to-[#131a2d] justify-center items-center h-full overflow-y-hidden flex flex-col'>
      <section className='grid grid-cols-2 grid-flow-row gap-8 justify-center items-center h-full'>
        <ShowClassesRecorded />
        <ShowClassesRecorded />
        <ShowClassesRecorded />
        <ShowClassesRecorded />
        <ShowClassesRecorded />
        <ShowClassesRecorded />
        <ShowClassesRecorded />
        <ShowClassesRecorded />
      </section>
    </main>
  )
}
