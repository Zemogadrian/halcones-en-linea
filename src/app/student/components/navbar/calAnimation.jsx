'use client'

import Link from 'next/link'
import { useState } from 'react'

export const CalAnimation = ({ children, href }) => {
  const [active, setActive] = useState(false)
  const [selected, setSelected] = useState('')

  const handleClick = (e) => {
    setActive(!active)
    setSelected(e.target.innerText)
  }

  console.log(selected)
  return (
    <Link href={href}>
      <button onClick={handleClick} className={selected ? 'px-2 text-[#27316e] hover:text-[#fff] hover:bg-gradient-to-tr from-[#1f5186] to-[#131a2d] hover:rounded-lg' : ''}>
        {children}
      </button>
    </Link>
  )
}
