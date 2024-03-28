import { H1, H2 } from '@/components/utils'

export default function CreateActivities () {
  return (
    <div className='flex flex-col h-full w-full gap-40'>
      <div className='border-b-2 border-b-black px-10 py-5'>
        <H1 className='text-white underline'>Crea tu actividad</H1>
        <H2 className='text-white'>Selecciona la actividad a crear para tus alumnos</H2>
      </div>
      <div className='flex flex-col gap-5 justify-center items-center'>
        <button />
        <div className='flex flex-col gap-5'>
          <button className='h-14 w-64 bg-[#cecbcb]'>
            Trivia
          </button>
          <button className='h-14 w-64  bg-[#cecbcb]'>
            Examen
          </button>
          <button className='h-14 w-64  bg-[#cecbcb]'>
            Cuestionario
          </button>
          <button className='h-14 w-64  bg-[#cecbcb]'>
            Trabajo
          </button>
        </div>
        <button />
      </div>
    </div>
  )
}
