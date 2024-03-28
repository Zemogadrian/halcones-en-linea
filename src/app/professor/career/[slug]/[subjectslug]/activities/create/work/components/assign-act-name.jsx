'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const AssignActName = async () => {
  const { replace } = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const handleOnChange = (e) => {
    const queryParams = new URLSearchParams(params)

    queryParams.set('activityname', e.target.value)

    const URL = `${pathname}?${queryParams.toString()}`
    replace(URL)
  }
  return (
    <div className='flex flex-row gap-10 justify-center items-center'>
      <button>
        <img src='/arrow.svg' alt='' className='w-14 h-14 rotate-90' />
      </button>
      <input type='text' onChange={handleOnChange} placeholder='Escribe el nombre de la actividad' className='underline-offset-auto text-white bg-transparent border-2 w-[30rem] h-40 text-center font-bold border-slate-500' />
      <button>
        <img src='/arrow.svg' alt='' className='w-14 h-14 -rotate-90' />
      </button>
    </div>
  )
}
