export default function ShowClassesRecorded () {
  return (
    <main className='gap-3 flex flex-row justify-center '>
      <div className=' flex font-black  rounded-xl w-14 h-14 items-center justify-center text-center bg-[#cecccd] text-[#212852] text-xl'>
        <span>
          Abr 30
        </span>
      </div>
      <div className='flex flex-col gap-4'>
        <span className=' flex flex-col font-black  rounded-xl h-14 p-2 items-center justify-center text-center bg-[#cecccd] text-[#212852] text-xl underline'>Marketing de negocios</span>
        <button className='flex flex-row items-center justify-center gap-2'>
          <img src='/upload.svg' alt='' className='w-5 h-5' />
          <span className='text-white'>Precursores del Marketing</span>
        </button>
      </div>
    </main>
  )
}
