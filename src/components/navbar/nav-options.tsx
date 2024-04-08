'use client'

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { v4 } from '@/utils/uuid'
import { NavBarItem } from './types'
import { pathnameFormatter } from '@/utils/formatters'

interface Props {
  options: NavBarItem[]
}

export const NavOptions = ({ options }: Props) => {
  const pathname = usePathname()
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  // pathname /student/[career]/subject
  // replace [career] with params.career

  const routes = options.find(({ startWith }) => {
    const formattedStartWith = decodeURIComponent(pathnameFormatter(startWith, params))

    return decodeURIComponent(pathname).startsWith(formattedStartWith)
  })?.getRoutes({ params, queryParams: searchParams })

  if (routes == null) return null

  return (
    <section className='flex flex-row text-xl h-full justify-center flex-1 items-center'>
      {/* <div className='flex flex-row text-xl h-full justify-center items-center'> */}
      {routes.map(({ name, href, ref, queryParam, onClick, target }, i) => {
        if (href != null) {
          const newHref = pathnameFormatter(href, params)
          const newSearch = new URLSearchParams(searchParams)

          if (queryParam != null && ref != null) {
            newSearch.set(queryParam, ref)
          }

          return (
            <Link
              key={v4()}
              className={`
            flex border-r-[#27316e] px-2 py-1
            ${i === (routes.length - 1) ? '' : 'border-r-2'} 
            `}
              target={target}
              onClick={() => { onClick?.({ router }) }}
              href={`${newHref}?${newSearch.toString()}`}
            >
              <span
                className={`
              px-2 hover:text-[#fff] hover:bg-gradient-to-tr from-[#1f5186] to-[#131a2d] hover:rounded-lg
            ${
              pathname === newHref
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

        if (onClick != null) {
          return (
            <button
              key={v4()}
              className={`
            flex border-r-[#27316e] px-2 py-1
            ${i === (routes.length - 1) ? '' : 'border-r-2'} 
            `}
              onClick={() => onClick({ router })}
            >
              <span
                className={`
              px-2 hover:text-[#fff] hover:bg-gradient-to-tr from-[#1f5186] to-[#131a2d] hover:rounded-lg
          `}
              >
                {name}
              </span>
            </button>
          )
        }

        return null
      })}
      {/* </div> */}
    </section>

  )
}
