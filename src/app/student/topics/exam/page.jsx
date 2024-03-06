import DisplayClass from '../../components/students/display-days'

export default function Exams () {
  return (
    <main className='gap-10 flex flex-col justify-center items-center'>
      <div className='grid grid-cols-2 grid-flow-row gap-20'>
        <DisplayClass />
      </div>
    </main>
  )
}
