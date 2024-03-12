'use client'

import Link from 'next/link'
import { useState } from 'react'

export const CalAnimation = ({ children, href }) => {
  const routes = [
    {
      name: 'Temas',
      href: '/student/topics/subjects'
    },
    {
      name: 'Documentación',
      href: '/student/topics/documents'
    },
    {
      name: 'Actividades',
      href: '/student/topics/activities'
    },
    {
      name: 'Examen',
      href: '/student/topics/exam'
    },
    {
      name: 'Clases grabadas',
      href: '/student/topics/recordedclasses'
    }
  ]

  const [active, setActive] = useState(false)
  const [selected, setSelected] = useState('')

  const handleClick = (e) => {
    setActive(prev => !prev)
    setSelected(e.target.innerText)
  }

  return (
    <div className='flex flex-row text-xl h-full justify-center items-center'>
      {routes.map(({ name, href }) => (
        <div className='flex  border-r-2 border-r-[#27316e] px-2 py-1' key={name}>
          <Link href={href}>
            <button
              onClick={handleClick}
              className={` px-2
          ${selected === name ? 'text-[#fff] bg-gradient-to-tr from-[#1f5186] to-[#131a2d] rounded-lg' : 'text-[#27316e]'}
          hover:text-[#fff] hover:bg-gradient-to-tr from-[#1f5186] to-[#131a2d] hover:rounded-lg
        `}
            >
              {name}
            </button>
          </Link>
        </div>
      ))}
    </div>
  //   )}
  //   </div>
  //    <Link href={href}>
  //       <button onClick={handleClick} className={selected ? ' : ''}>
  //         {children}
  //       </button>
  //     </Link>
  )
}
