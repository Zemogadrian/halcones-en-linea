'use client'

import { motion } from 'framer-motion'
import LogoutButton from '../logout'
import { useEffect } from 'react'

interface Props {
  deployEvents: () => () => void
}

export const OptionContainer = ({ deployEvents }: Props) => {
  useEffect(() => {
    const closeEvents = deployEvents()

    return () => {
      closeEvents()
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.1 }}
      className='absolute top-12 right-0 bg-[#394075] rounded-lg shadow-md'
    >
      <LogoutButton
        className='text-white w-full text-left hover:bg-[#b0b0b0] rounded-lg px-3 py-1 transition-colors'
      >
        Cerrar sesión
      </LogoutButton>
    </motion.div>
  )
}
