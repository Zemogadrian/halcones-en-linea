'use client'
import { H1, H2 } from '@/components/utils'
import { OptionsSection } from './components/options-section'

export default function CreateTrivia ({ searchParams, isButtonClicked }) {
  const answers: string[] = searchParams?.triviaanswer?.split(',')

  console.log(answers)
  return (
    <div className='flex flex-col h-full w-full gap-20'>
      <div className='border-b-2 border-b-black px-10 py-5'>
        <H1 className='text-white'>Arma tu trivia</H1>
        <H2 className='text-white'>Sigue las instrucciones en cada apartado para completar y asignar la trivia a tus alumnos correctamente</H2>
      </div>
      <div className='text-center text-white font-bold text-2xl flex flex-col overflow-x-hidden h-[40rem] items-center'>
        <h1 className='text-white font-bold text-xl mt-2'>
          {searchParams?.trivianame}
        </h1>
        <h2 className='text-[#c4ccd3] font-bold text-xl mb-5'>
          {searchParams?.triviaquestion}
        </h2>
        {answers?.map((answer: string, index: number) => (
          <h2 key={index} className='text-[#c4ccd3] font-bold text-xl'>
            {answer}
          </h2>
        ))}
      </div>
      <OptionsSection />
    </div>
  )
}
