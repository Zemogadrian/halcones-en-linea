'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const DeadlineAct = () => {
  const { replace } = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const handleOnChange = (e) => {
    const queryParams = new URLSearchParams(params)

    queryParams.set('activitydeadline', e.target.value)

    const URL = `${pathname}?${queryParams.toString()}`
    replace(URL)
  }
  return (
    <div className='flex flex-col gap-10 justify-center items-center'>
      <div className='flex flex-row gap-5'>
        <button>
          <img src='/arrow.svg' alt='' className='w-14 h-14 rotate-90' />
        </button>
        <input type='text' onChange={handleOnChange} placeholder='Fecha de entrega' className='underline-offset-auto text-white bg-transparent border-2 w-[30rem] h-40 text-center font-bold border-slate-500' />
        <button>
          <img src='/arrow.svg' alt='' className='w-14 h-14 -rotate-90' />
        </button>
      </div>
      <button className='bg-[#1a62a6] text-white px-4 py-1 rounded-md'>
        Asignar actividad
      </button>
    </div>

  )
}
