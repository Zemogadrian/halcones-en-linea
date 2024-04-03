import { usePathname, useSearchParams, useRouter } from 'next/navigation'

export const Answer = ({ value, onChange }) => {
  const { replace } = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const handleOnChangeAnswer = (e) => {
    onChange(e.target.value)

    const queryParams = new URLSearchParams(params)
    const existingAnswers = queryParams?.get('triviaanswer') ? queryParams?.get('triviaanswer')?.split(',') : []
    existingAnswers?.push(e.target.value)
    queryParams.set('triviaanswer', existingAnswers.join(','))
    const URL = `${pathname}?${queryParams.toString()}`
    replace(URL)
  }

  return (
    <div className='flex flex-row gap-4  bg- font-bold text-lg p-2 rounded-xl w-full bg-[#ccccca]'>
      <input value={value} type='text' onChange={handleOnChangeAnswer} placeholder='Escribe tu respuesta' required className='placeholder-[#4c5898] bg-[#ccccca]' />
      <button className='bg-[#1a639f] px-2 rounded-lg text-white font-normal'>Respuesta correcta</button>
      <button className='bg-[#1a639f] px-2 rounded-lg text-white font-normal'>+</button>
    </div>
  )
}
