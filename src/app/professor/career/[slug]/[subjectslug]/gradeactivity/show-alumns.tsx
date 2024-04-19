'use client'
import { useState } from 'react'

export const ShowAlumns = () => {
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
  )
}
