import { H1 } from '@/components/utils'
import { Alumn } from './alumn'
import { Works } from './works'

export default function Qualifications () {
  return (
    <section className='flex flex-col items-center gap-8 px-10'>
      <H1 className='text-[#363664] text-center bg-[#cfd2d5] p-1 rounded-md'>Actividades de Fotografía Publicitaria</H1>
      <div className='flex flex-col border-b w-full'>
        <h2 className='text-lg font-bold text-center mb-5 text-[#8d96a7]'>Realizar 5 fotos con elemento humano, destacando el producto o servicio</h2>
      </div>
      <div className='gap-5 flex flex-row justify-end w-full '>
        <select className='rounded-md bg-[#838991] border text-white px-1'>
          <option value=''>Todas</option>
          <option value='1'>Entregadas</option>
          <option value='2'>Sin entregar</option>
        </select>
        <select className='rounded-md bg-[#838991] border text-white px-1'>
          <option value=''>Alumno</option>
          <option value='1'>Alumno 1</option>
          <option value='2'>Alumno 2</option>
          <option value='3'>Alumno 3</option>
        </select>
        <select className='rounded-md bg-[#838991] border text-white px-1'>
          <option value=''>Trabajo</option>
          <option value='1'>Trabajo 1</option>
          <option value='2'>Trabajo 2</option>
        </select>
      </div>
      <div className='flex flex-row gap-5 w-full h-[35rem] '>
        <Alumn />
        <Works />
      </div>

    </section>
  )
}
