import { usePathname, useSearchParams, useRouter } from 'next/navigation'

export const Answer = ({ value, onChange, className, onCorrectAnswer }) => {
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
  const handleCorrectAnswer = () => {
    onCorrectAnswer(value)
    console.log(value)
  }

  return (
    <div className='flex flex-row gap-4  bg- font-bold text-lg p-2 rounded-xl w-full bg-[#ccccca]'>
      <input value={value} type='text' onChange={handleOnChangeAnswer} placeholder='Escribe tu respuesta' required className='placeholder-[#4c5898] bg-[#ccccca]' />
      <button onClick={handleCorrectAnswer} className='bg-[#1a639f] px-2 rounded-lg text-white font-normal'>Respuesta correcta</button>
    </div>
  )
}
