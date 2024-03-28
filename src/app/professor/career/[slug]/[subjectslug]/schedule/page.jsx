import { H1 } from '@/components/utils'

export default function Schedule () {
  return (
    <div>
      <div className='border-b-2 border-b-black px-10 py-5'>
        <H1 className='text-white underline'>Horario de clases</H1>
      </div>
      <div className='flex flex-row gap-5 '>
        <div className=' w-14 h-14 bg-[#cecbcb]'>
          ª
        </div>
        <div className='  bg-[#cecbcb]'>
          ª
        </div>
      </div>
    </div>
  )
}
