'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { v4 } from '@/utils/uuid'

const className = {
  link: {
    base: 'w-full flex rounded-md px-2 py-1 transition-colors duration-200',
    active: ''
  },
  span: {
    base: 'font-semibold transition-colors duration-200 capitalize',
    active: ' '
  }
}

export const SideBarItem = (
  { isMultiple = false, children, href, multipleOptions = [] }
) => {
  const pathname = usePathname()
  const isOpen = pathname === href || multipleOptions.some(({ href: h }) => pathname === `${href}${h}`)
  const isSelected = pathname === href

  return (
    <li className='flex flex-col gap-1 select-none'>
      <Link
        className={
            `
                ${className.link.base}
                ${isSelected ? className.link.active : ''}
            `
        }
        href={href}
      >
        <span
          className={`
                ${className.span.base}
                ${isSelected ? className.span.active : ''}
            `}
        >{children}
        </span>
      </Link>

      <AnimatePresence>
        {(isOpen && isMultiple) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul
              className='flex flex-col gap-1'
            >
              {multipleOptions.map(({ title, href: h }) => {
                const newHref = `${href}${h}`
                const isSelected = pathname === newHref

                return (
                  <li
                    key={v4()}
                  >
                    <Link
                      href={newHref}
                      className={`
                        ${className.link.base}
                        ${isSelected ? className.link.active : ''}
                    `}
                    >
                      <span
                        className={`
                            ${className.span.base}
                            ml-4 ${isSelected ? className.span.active : ''}
                        `}
                      >
                        {title}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}
