'use client'

import { v4 } from '@/utils/uuid'
import { useState } from 'react'

const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']

export const Days = () => {
  const [selected, setSelected] = useState('')

  return (
    <div className='items-center justify-center flex gap-2'>
      {days.map((day) => (
        <button
          key={v4()}
          onClick={() => setSelected(day)}
          className={`${selected === day ? 'text-[#808080] bg-[#fff] ' : 'text-[#fff] bg-[#808080] '}] text-xl font-bold rounded-full  w-10 h-10 bg-[#808080]  `}
        >
          {day[0]}
        </button>
      ))}
    </div>
  )
}
