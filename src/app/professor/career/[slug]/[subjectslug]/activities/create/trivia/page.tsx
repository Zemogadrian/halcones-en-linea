'use client'
import { H1, H2, Main } from '@/components/utils'
import { OptionsSection } from './components/options-section'

interface Props {
  searchParams: {
    trivianame: string
    triviaquestion: string
    triviaanswer: string
    correctAnswer: string
  }
}
export default function CreateTrivia ({ searchParams }: Props) {
  const answers: string[] = searchParams?.triviaanswer?.split(',')

  const correctAnswer = searchParams?.correctAnswer
  console.log(correctAnswer)

  return (
    <Main>
      <header className='border-b-2 border-b-black px-10 py-5'>
        <H1 className='text-white'>Arma tu trivia</H1>
        <H2 className='text-white'>Sigue las instrucciones en cada apartado para completar y asignar la trivia a tus alumnos correctamente</H2>
      </header>
      <section className='text-center text-white font-bold text-2xl flex-1 flex flex-col gap-2'>
        <div className='h-[30%] overflow-y-auto mt-3'>
          <h1 className='text-white font-bold text-xl mt-2'>
            {searchParams?.trivianame}
          </h1>
          <h2 className='text-[#c4ccd3] font-bold text-xl mb-5'>
            {searchParams?.triviaquestion}
          </h2>
          <ol className='text-[#c4ccd3] font-bold text-xl list-upper-alpha'>
            {answers?.map((answer: string, index: number) => (
              <li key={index} className={answer === correctAnswer ? 'text-green-500' : ''}>
                {answer}
              </li>
            ))}
          </ol>
        </div>
        <OptionsSection />
      </section>
    </Main>
  )
}
