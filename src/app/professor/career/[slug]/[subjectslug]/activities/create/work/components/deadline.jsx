'use client'

import { createActivity } from '@/services/supabase/actions/professors'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const DeadlineAct = () => {
  const { replace } = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const defaultValue = params.get('activitydeadline') ?? ''

  const handleOnChange = (e) => {
    const queryParams = new URLSearchParams(params)

    queryParams.set('activitydeadline', e.target.value)

    const URL = `${pathname}?${queryParams.toString()}`
    replace(URL)
  }

  createActivity()
  return (
    <div className='flex flex-col gap-10 justify-center items-center'>
      <input defaultValue={defaultValue} type='text' required onChange={handleOnChange} placeholder='Fecha de entrega' className='underline-offset-auto text-white bg-transparent border-2 w-[30rem] h-40 text-center font-bold border-slate-500' />
      <button className='bg-[#1a62a6] text-white px-4 py-1 rounded-md'>
        Asignar actividad
      </button>
    </div>

  )
}
