export default function DisplayClass () {
  return (
    <div className='flex flex-row gap-2'>
      <div className='flex flex-col rounded-xl bg-white font-black text-xl border-2 px-2  justify-center items-center text-[#212852]'>
        <span>Abril</span>
        <span>30</span>
      </div>
      <div className='flex flex-col rounded-xl bg-white font-black text-xl border-2 px-2 justify-center items-center text-[#212852]'>
        <span className='underline'>Marketing de negocios</span>
      </div>
    </div>
  )
}
