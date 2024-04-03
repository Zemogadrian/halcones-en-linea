'use client'

import { motion, useAnimation } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

interface Props {
  position: number
  children: React.ReactNode
}

export const AnimatedDisplay = ({
  position,
  children
}: Props) => {
  const searchParams = useSearchParams()
  const currentPosition = parseInt(searchParams.get('position') ?? '1')

  const isSelected = position === currentPosition
  const isLeft = position === (currentPosition - 1)
  const isRight = position === (currentPosition + 1)
  const isLoaded = isSelected || isLeft || isRight

  const control = useAnimation()

  useEffect(() => {
    control.set({ zIndex: -20 })

    control.start({
      x: isSelected ? 0 : isLeft ? -500 : 500,
      opacity: isSelected ? 1 : 0
    })
      .finally(() => {
        control.set({ zIndex: isSelected ? 1 : -20 })
      })
      .catch(err => console.log(err))

    // if (isSelected) {
    // }
  }, [position, currentPosition])

  return isLoaded && (
    <motion.div
      initial={{
        x: isSelected ? 0 : isLeft ? -500 : 500,
        opacity: isSelected ? 1 : 0,
        zIndex: isSelected ? 1 : -20
      }}
      animate={control}
      transition={{ duration: 1.2, ease: [0.04, 0.62, 0.23, 0.98] }}
      className='flex flex-row gap-5  justify-center items-center overflow-y-visible absolute inset-0 w-full h-full'
    >
      {children}
    </motion.div>
  )
}
