import { useAnimation, motion } from 'framer-motion'
import { useEffect } from 'react'

interface Props {
  children: React.ReactNode
  position: number
  currentPosition: number
}

export function AnimateContainer ({ children, position, currentPosition }: Props) {
  const control = useAnimation()

  const isLeft = currentPosition - 1 === position
  const isRight = currentPosition + 1 === position
  const isCurrent = currentPosition === position

  const isRender = isLeft || isRight || isCurrent

  useEffect(() => {
    control.set({
      zIndex: isCurrent ? 1 : -10
    })

    control.start({
      x: isLeft ? '-100%' : isRight ? '100%' : '0%',
      opacity: isCurrent ? 1 : 0
    })
      .catch(err => {
        console.log(err)
      })
  }, [isLeft, isRight, isCurrent])

  return isRender && (
    <motion.div
      animate={control}
      className='absolute w-full h-full flex flex-col justify-center items-center'
    >
      {children}
    </motion.div>
  )
}
