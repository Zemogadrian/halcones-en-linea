import { H1 } from '@/components/utils'

export default function Schedule () {
  return (
    <div className='flex flex-col'>
      <div className='border-b-2 border-b-black px-10 py-5'>
        <H1 className='text-white underline'>Horario de clases</H1>
      </div>
      <div className='flex flex-row gap-2 p-20'>
        <div className=' w-14 h-14 bg-[#cecbcb] rounded-xl text-center flex flex-col justify-center'>
          Dia
        </div>
        <div className='bg-[#cecbcb] rounded-xl text-center flex flex-col justify-center px-5 underline'>
          Horario
        </div>
      </div>
    </div>
  )
}
