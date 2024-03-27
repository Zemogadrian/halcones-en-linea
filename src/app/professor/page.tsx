import { H1, Main } from '@/components/utils'
import { getMyReducedCareers } from '@/services/supabase/actions/professors'
import { v4 } from '@/utils/uuid'

export default async function ProfessorPage () {
  const careers = await getMyReducedCareers()

  console.log(careers)

  return (
    <Main
      className='w-full flex flex-col max-w-6xl mx-auto px-4'
    >

      <header
        className='border-b pb-4 px-14 mb-10'
      >
        <H1
          className='text-[#cdcccb] border-b w-min'
        >
          Bienvenido
        </H1>

        <span className='text-white font-bold text-lg'>
          Selecciona la carrera en la que desees ingressar
        </span>
      </header>

      <section
        className='flex flex-col items-center gap-4 mt-4 w-full px-80'
      >
        {careers.map((career) => (
          <div
            key={v4()}
            className='gap-4 bg-[#cdcccb] rounded-lg px-4 w-full'
          >
            <span className='text-black font-bold text-lg'>
              {career?.name}
            </span>
          </div>
        ))}
      </section>

    </Main>
  )
}
