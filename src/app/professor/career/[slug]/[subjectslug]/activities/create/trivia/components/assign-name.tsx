'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const AssignTrivName = () => {
  const { replace } = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const defaultValue = params.get('trivianame') ?? ''

  const handleOnChange = (e) => {
    const queryParams = new URLSearchParams(params)
    queryParams.set('trivianame', e.target.value)
    const URL = `${pathname}?${queryParams.toString()}`
    replace(URL)
  }

  return (
    <div>
      <input defaultValue={defaultValue} type='text' onChange={handleOnChange} placeholder='Escribe el nombre de la trivia' required className='underline-offset-auto text-white bg-transparent border-2 w-[30rem] h-40 text-center font-bold border-slate-500' />
    </div>
  )
}
