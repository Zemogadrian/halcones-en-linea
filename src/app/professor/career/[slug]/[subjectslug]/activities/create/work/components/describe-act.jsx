'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

export const DescribeAct = ({ currentPosition, position }) => {
  const { replace } = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const handleOnChange = (e) => {
    const queryParams = new URLSearchParams(params)

    queryParams.set('activitydescription', e.target.value)

    const URL = `${pathname}?${queryParams.toString()}`
    replace(URL)
  }

  const isActive = currentPosition === position

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          animate={{ x: 0, opacity: 1 }}
          initial={{ x: 500, opacity: 0 }}
          exit={{ position: 'absolute', inset: 0, x: -500, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.04, 0.62, 0.23, 0.98] }}
          className='flex flex-row gap-5  justify-center items-center overflow-y-visible'
        >
          <input type='text' onChange={handleOnChange} placeholder='Describe la actividad' className='underline-offset-auto text-white bg-transparent border-2 w-[30rem] h-40 text-center font-bold border-slate-500' />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
