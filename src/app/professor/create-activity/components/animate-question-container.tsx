import { useAnimation, motion } from 'framer-motion'
import { useEffect } from 'react'

interface Props {
  index: number
  lastIndex: number
  children: React.ReactNode
}

export const AnimateQuesionConatiner = ({ index, lastIndex, children }: Props) => {
  const control = useAnimation()

  useEffect(() => {
    if (index === lastIndex) {
      control.start({
        x: '0%',
        opacity: 1
      }, {
        bounce: 2
      })
        .catch(err => console.log(err))
      return
    }

    control.start({
      x: index > lastIndex ? '-100%' : '100%',
      opacity: 0
    }, {
      bounce: 2
    })
      .then(() => {
        control.start({
          x: index > lastIndex ? '100%' : '-100%',
          opacity: 0
        }, {
          duration: 0,
          bounce: 0
        })
          .finally(() => {
            control.start({
              x: '0%',
              opacity: 1
            }, {
              bounce: 2
            })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }, [index, lastIndex])

  return (
    <motion.div
      animate={control}
      initial={{
        x: index === lastIndex ? '100%' : index > lastIndex ? '-100%' : '100%',
        opacity: 0
      }}
      className='absolute w-full h-full flex flex-col justify-center items-center'
    >
      {children}
    </motion.div>
  )
}
