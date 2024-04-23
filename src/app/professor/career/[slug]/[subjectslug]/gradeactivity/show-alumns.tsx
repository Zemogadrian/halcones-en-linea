'use client'
import { H1 } from '@/components/utils'
import { useState } from 'react'

export const ShowAlumns = ({ students }) => {
  const [selectedValue, setSelectedValue] = useState(0)

  console.log(students)

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value)
  }

  const handlePrevClick = () => {
    const newValue = selectedValue - 1
    if (newValue >= 0) {
      setSelectedValue(newValue)
    }
  }

  const handleNextClick = () => {
    const newValue = selectedValue + 1
    if (newValue < students.length) {
      setSelectedValue(newValue)
    }
  }

  console.log(selectedValue)
  return (

    <section className='flex flex-col w-full border-b-[2px] py-2 gap-10'>
      <H1 className='text-center text-[#1a3b62]  items-center justify-center flex'>
        <span className='bg-white px-14'>
          Titulo de la actividad
        </span>
      </H1>
      <div className='flex flex-row gap-10'>
        <select className='bg-transparent text-[#8f8992]' value={selectedValue} onChange={handleSelectChange}>
          {students.map((student, index) => (
            <option key={student.id} value={index}>
              {student.first_name} {student.last_name}
            </option>
          ))}
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
