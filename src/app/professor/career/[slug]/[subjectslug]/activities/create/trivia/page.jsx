import { H1, H2 } from '@/components/utils'

export default function CreateTrivia () {
  return (
    <div className='flex flex-col h-full w-full gap-40'>
      <div className='border-b-2 border-b-black px-10 py-5'>
        <H1 className='text-white'>Arma tu trivia</H1>
        <H2 className='text-white'>Sigue las instrucciones en cada apartado para completar y asignar la trivia a tus alumnos correctamente</H2>
      </div>
      <div className='flex flex-row gap-10 justify-center items-center'>
        <button>
          <img src='/arrow.svg' alt='' className='w-14 h-14 rotate-90' />
        </button>
        <input type='text' placeholder='Escribe el nombre de la trivia' className='underline-offset-auto text-white bg-transparent border-2 w-[30rem] h-40 text-center font-bold border-slate-500' />
        <button>
          <img src='/arrow.svg' alt='' className='w-14 h-14 -rotate-90' />
        </button>
      </div>
    </div>
  )
}
