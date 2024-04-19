'use client'
import { H1 } from '@/components/utils'
import { useState } from 'react'
// import ShowImage from './show-image'

export const GradeActivity = () => {
  const [selectedValue, setSelectedValue] = useState('1')

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value)
  }

  const handlePrevClick = () => {
    const newValue = parseInt(selectedValue) - 1
    if (newValue >= 1) {
      setSelectedValue(newValue.toString())
    }
  }

  const handleNextClick = () => {
    const newValue = parseInt(selectedValue) + 1
    if (newValue <= 4) {
      setSelectedValue(newValue.toString())
    }
  }

  return (
    <main className='flex flex-col gap-5 w-full h-full '>
      <H1 className='text-center text-[#1a3b62] bg-white items-center justify-center flex'>Titulo de la actividad </H1>
      <section className=' w-full border-b-[2px] py-2'>
        <div className='flex flex-row gap-10'>
          <select className='bg-transparent text-[#8f8992]' value={selectedValue} onChange={handleSelectChange}>
            <option value='1'>Nombre del alumno</option>
            <option value='2'>alumno 1</option>
            <option value='3'>alumno 2</option>
            <option value='4'>alumno 3</option>
          </select>
          <button className='' onClick={handlePrevClick}>
            <img src='/arrow.svg' alt='arrow-left' className=' w-5 h-5 rotate-90' />
          </button>
          <button className='' onClick={handleNextClick}>
            <img src='/arrow.svg' alt='arrow-right' className=' w-5 h-5 -rotate-90' />
          </button>
        </div>
      </section>
      <section className='flex flex-row gap-10'>
        {/* <ShowImage /> */}
        <div className='flex flex-col w-1/4  gap-2 border'>
          <span className='underline text-xl font-black text-[#cfd0d2] px-5 text-center'>Trabajo</span>
          <section className='flex flex-col p-5'>
            {/* <span className='p-2 text-[#cfd0d2] border'>Calificación</span> */}
            <input type='text' className='p-2 text-[#cfd0d2] border bg-transparent' placeholder='Calificación' />
            <input type='text' className='p-2 text-[#cfd0d2] border bg-transparent' placeholder='Comentario' />
            <button className='rounded-md bg-[#1664a6] text-white w-24 self-center mt-10'>
              Enviar
            </button>
          </section>
        </div>
      </section>
    </main>
  )
}
