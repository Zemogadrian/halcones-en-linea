export default async function DisplayExamn () {
  return (
    <main className=' overflow-y-hidden flex justify-center'>
      <div className=' h-12 flex flex-row items-center justify-center '>
        <p className='px-5 h-full flex items-center text-[#1f5186] bg-[#fff]'>Su examen está programado para el dia 25 de mayo de 2024</p>
        <button className='bg-[#e51a1f] text-[#fff] h-full px-2'>
          <p>Realizar examen</p>
        </button>
      </div>
    </main>
  )
}
