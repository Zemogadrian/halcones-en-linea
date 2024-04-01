'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const DescribeAct = () => {
  const { replace } = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const defaultValue = params.get('activitydescription') ?? ''

  const handleOnChange = (e) => {
    const queryParams = new URLSearchParams(params)

    queryParams.set('activitydescription', e.target.value)

    const URL = `${pathname}?${queryParams.toString()}`
    replace(URL)
  }

  return (
    <input type='text' required defaultValue={defaultValue} onChange={handleOnChange} placeholder='Describe la actividad' className='underline-offset-auto text-white bg-transparent border-2 w-[30rem] h-40 text-center font-bold border-slate-500' />
  )
}
