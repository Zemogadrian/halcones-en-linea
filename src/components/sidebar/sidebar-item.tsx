'use client'

import { ArrowIcon } from '@/assets/icons'
import { v4 } from '@/utils/uuid'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { SubElement } from './types'
import { SubEl } from './sub-el'

interface Props {
  onClick?: () => void
  children: React.ReactNode
  subItems?: SubElement[]
}

export const SideBarMultiItem = ({
  children,
  subItems = [],
  onClick
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li
      className='cursor-pointer'
    >
      <button
        className='px-7 py-2 w-full flex items-center bg-gradient-to-r from-itesus-primary to-itesus-secondary gap-3'
        onClick={() => {
          onClick?.()
          setIsOpen(prev => !prev)
        }}
      >
        <ArrowIcon width={12} fill='#fff' className={`${isOpen ? '' : '-rotate-90'} transition-transform`} />
        <span
          className='text-left text-xl font-bold text-white'
        >
          {children}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={{
              collapsed: { opacity: 0, height: 0 },
              open: {
                opacity: 1,
                height: 'auto'
              }
            }}
            initial='collapsed'
            animate='open'
            exit='collapsed'
          >
            <ul>
              {subItems.map((item) => (
                <SubEl
                  {...item}
                  key={v4()}
                />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}
