'use client'

import { ArrowIcon, SquareIcon } from '@/assets/icons'
import { getCookie } from '@/services/actions'
import { v4 } from '@/utils/uuid'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface Props {
  onClick?: () => void
  children: React.ReactNode
  subItems?: Array<{
    title: string
    href: string
    type?: 'subject'
  }>
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
                  href={item.href}
                  title={item.title}
                  type={item.type}
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

const SubEl = ({ title, href, type }: {
  title: string
  href: string
  type?: 'subject'
}) => {
  const pathname = usePathname()
  const isActive = type != null ? pathname.includes(href) : pathname === href
  const [req, setReq] = useState('')

  const requirements = {
    subject: () => {
      getCookie('calNav')
        .then(cookie => {
          if (cookie != null) {
            setReq(cookie.value)
          } else {
            setReq('topics')
          }
        })
        .catch(console.error)
    }
  }

  if (type != null) {
    requirements[type]()
  }

  return (
    <Link
      key={v4()} href={type != null ? `${href}/${req}` : href}
    >
      <li
        className={`flex px-7 gap-4 border-b border-b-gray-400 ${isActive ? 'bg-[#808080]' : 'bg-[#e7e6e6]'}`}
      >
        {
          isActive
            ? <ArrowIcon fill='#fff' width={8} className='-rotate-90 animate-fade-in animate-duration-150' />
            : <SquareIcon width={6} className='animate-fade-in animate-duration-150' />
        }
        <span
          className={`text-left text-lg font-medium ${isActive ? 'text-white' : 'text-gray-500'}`}
        >{title}
        </span>
      </li>
    </Link>
  )
}
