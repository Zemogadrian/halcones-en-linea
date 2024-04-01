'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const AssignActName = () => {
  const { replace } = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const defaultValue = params.get('activityname') ?? ''

  const handleOnChange = (e) => {
    const queryParams = new URLSearchParams(params)
    queryParams.set('activityname', e.target.value)
    const URL = `${pathname}?${queryParams.toString()}`
    replace(URL)
  }

  return (
    <input defaultValue={defaultValue} type='text' onChange={handleOnChange} placeholder='Escribe el nombre de la actividad' required className='underline-offset-auto text-white bg-transparent border-2 w-[30rem] h-40 text-center font-bold border-slate-500' />
  )
}
