'use client'

import { ArrowIcon, SquareIcon } from '@/assets/icons'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubElement } from './types'

export const SubEl = ({ title, href, type, defaultRef }: SubElement) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isActive = type != null
    ? decodeURIComponent(pathname).includes(href)
    : decodeURIComponent(pathname) === href
  const [req, setReq] = useState('')

  useEffect(() => {
    if (type != null) {
      const searchParamType = searchParams.get(type)

      if (searchParamType != null) {
        setReq(searchParamType)
      } else if (defaultRef != null) {
        setReq(defaultRef)
      }
    }
  }, [type, searchParams])

  return (
    <Link
      href={type != null ? `${href}/${req}?${searchParams.toString()}` : `${href}?${searchParams.toString()}`}
    >
      <li
        className={
            `flex px-7 gap-4 border-b border-b-gray-400 ${isActive ? 'bg-[#808080]' : 'bg-[#e7e6e6]'}`
          }
      >
        {
            isActive
              ? <ArrowIcon fill='#fff' width={8} className='-rotate-90 animate-fade-in animate-duration-150' />
              : <SquareIcon width={6} className='animate-fade-in animate-duration-150' />
          }
        <span
          className={
              `text-left text-lg font-medium ${isActive ? 'text-white' : 'text-gray-500'}`
            }
        >
          {title}
        </span>
      </li>
    </Link>
  )
}
