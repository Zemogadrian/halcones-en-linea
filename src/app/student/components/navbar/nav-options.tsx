'use client'

import { useParams, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { v4 } from '@/utils/uuid'
import { NavBarItem } from './types'

interface Props {
  options: NavBarItem[]
}

export const NavOptios = ({ options }: Props) => {
  const pathname = usePathname()
  const params = useParams()
  const searchParams = useSearchParams()

  const routes = options.find(({ startWith }) => pathname.startsWith(startWith))?.getRoutes({ params })

  if (routes == null) return null

  return (
    <section className='flex flex-row text-xl h-full justify-center flex-1 items-center'>
      {/* <div className='flex flex-row text-xl h-full justify-center items-center'> */}
      {routes.map(({ name, href, ref, queryParam, onClick }, i) => {
        if (onClick != null) {
          return (
            <button
              key={v4()}
              className={`
            flex border-r-[#27316e] px-2 py-1
            ${i === (routes.length - 1) ? '' : 'border-r-2'} 
            `}
              onClick={onClick}
            >
              <span
                className={`
              px-2 hover:text-[#fff] hover:bg-gradient-to-tr from-[#1f5186] to-[#131a2d] hover:rounded-lg
            ${
              pathname === href
              ? 'text-[#fff] bg-gradient-to-tr from-[#1f5186] to-[#131a2d] rounded-lg'
              : 'text-[#27316e]'
            }
          `}
              >
                {name}
              </span>
            </button>
          )
        }

        if (href != null && ref != null && queryParam != null) {
          const newSearch = new URLSearchParams(searchParams)
          newSearch.set(queryParam, ref)

          return (
            <Link
              key={v4()}
              className={`
            flex border-r-[#27316e] px-2 py-1
            ${i === (routes.length - 1) ? '' : 'border-r-2'} 
            `}
              href={`${href}?${newSearch.toString()}`}
            >
              <span
                className={`
              px-2 hover:text-[#fff] hover:bg-gradient-to-tr from-[#1f5186] to-[#131a2d] hover:rounded-lg
            ${
              pathname === href
              ? 'text-[#fff] bg-gradient-to-tr from-[#1f5186] to-[#131a2d] rounded-lg'
              : 'text-[#27316e]'
            }
          `}
              >
                {name}
              </span>
            </Link>
          )
        }

        return null
      })}
      {/* </div> */}
    </section>

  )
}
