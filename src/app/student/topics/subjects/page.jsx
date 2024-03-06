import DisplayTopics from '../../components/students/display-topics'

export default function Subjects () {
  return (
    <main className='bg-gradient-to-tr from-[#1f5186] to-[#131a2d] w-full overflow-y-hidden flex flex-row'>
      <section className='flex justify-center items-center w-full h-full'>
        <DisplayTopics />
      </section>
    </main>
  )
}
