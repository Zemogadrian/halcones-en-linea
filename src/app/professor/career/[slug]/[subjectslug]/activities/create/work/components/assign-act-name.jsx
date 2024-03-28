'use client'

import { AnimatePresence, motion, useAnimation, us } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DescribeAct } from './describe-act'

export const AssignActName = ({ currentPosition, position, direction }) => {
  const { replace } = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()
  const control = useAnimation()

  const handleOnChange = (e) => {
    const queryParams = new URLSearchParams(params)
    queryParams.set('activityname', e.target.value)
    const URL = `${pathname}?${queryParams.toString()}`
    replace(URL)
  }

  useEffect(() => {
    if (currentPosition === position) {
      control.start({ x: 0, opacity: 1 })
    }

    if (currentPosition !== position) {
      if (direction === '+') {
        control.start({
          position: 'absolute',
          inset: 0,
          x: -1000,
          opacity: 0
        })
        return
      }
      control.start({
        x: 1000,
        opacity: 0
      })
    }
  }, [currentPosition, position, direction])

  return (
    <motion.div
      animate={control}
      className='flex flex-row gap-5  justify-center items-center overflow-y-visible'
    >
      <input type='text' onChange={handleOnChange} placeholder='Escribe el nombre de la actividad' className='underline-offset-auto text-white bg-transparent border-2 w-[30rem] h-40 text-center font-bold border-slate-500' />
    </motion.div>
  )
}

export const DisplayOptions = () => {
  const [position, setPosition] = useState(1)
  const [direction, setDirection] = useState('+')

  const handleNav = (direction) => () => {
    setDirection(direction)
    if (direction === '+') {
      setPosition(position + 1)
    } else {
      setPosition(position - 1)
    }
  }

  return (
    <div className='flex flex-row gap-10 justify-center items-center overflow-x-hidden'>
      <button onClick={handleNav('-')}>
        <img src='/arrow.svg' alt='' className='w-14 h-14 rotate-90' />
      </button>
      <div className='relative'>
        <AssignActName direction={direction} currentPosition={position} position={1} />
        <DescribeAct direction={direction} currentPosition={position} position={2} />
      </div>
      <button onClick={handleNav('+')}>
        <img src='/arrow.svg' alt='' className='w-14 h-14 -rotate-90' />
      </button>
    </div>
  )
}
