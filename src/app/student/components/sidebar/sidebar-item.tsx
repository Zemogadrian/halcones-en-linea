'use client'

import { ArrowIcon, SquareIcon } from '@/assets/icons'
import { v4 } from '@/utils/uuid'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

interface Props {
  isOpen: boolean
  value: number
  onClick: (value: number) => void
  children: React.ReactNode
  subItems?: Array<{
    title: string
    href: string
  }>
}

export const SideBarMultiItem = ({
  isOpen,
  onClick,
  value,
  children,
  subItems = []
}: Props) => {
  return (
    <li
      className='cursor-pointer'
    >
      <button
        className='px-7 py-2 w-full flex items-center bg-gradient-to-r from-itesus-primary to-itesus-secondary gap-3'
        onClick={() => {
          onClick(value)
        }}
      >
        <ArrowIcon width={12} fill='#fff' />
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
                <Link key={v4()} href={item.href}>
                  <li
                    className='bg-[#e7e6e6] flex px-7 gap-4 border-b border-b-gray-400'
                  >
                    <SquareIcon width={6} />
                    <span
                      className='text-left text-lg font-medium text-gray-500'
                    >{item.title}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}
