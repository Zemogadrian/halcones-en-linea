'use client'

import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import Link from 'next/link'
import { v4 } from '@/utils/uuid'

export const NavOptios = () => {
  const pathname = usePathname()
  const params = useParams()
  const searchParams = useSearchParams()

  const options = [
    {
      startWith: '/student/subject',
      getRoutes: ({ params }) => {
        const subjectId = z.coerce.string().parse(params.id)

        return [
          {
            name: 'Temas',
            href: `/student/subject/${subjectId}/topics`,
            ref: 'topics',
            queryParam: 'subject-section'
          },
          {
            name: 'Documentación',
            href: `/student/subject/${subjectId}/documents`,
            ref: 'documents',
            queryParam: 'subject-section'
          },
          {
            name: 'Actividades',
            href: `/student/subject/${subjectId}/activities`,
            ref: 'activities',
            queryParam: 'subject-section'
          },
          {
            name: 'Examen',
            href: `/student/subject/${subjectId}/exam`,
            ref: 'exam',
            queryParam: 'subject-section'
          },
          {
            name: 'Clases grabadas',
            href: `/student/subject/${subjectId}/recordedclasses`,
            ref: 'recordedclasses',
            queryParam: 'subject-section'
          }
        ]
      }
    }
  ]

  const routes = options.find(({ startWith }) => pathname.startsWith(startWith))?.getRoutes({ params })

  if (routes == null) return null

  return (
    <section className='flex flex-row text-xl h-full justify-center flex-1 items-center'>
      {/* <div className='flex flex-row text-xl h-full justify-center items-center'> */}
      {routes.map(({ name, href, ref, queryParam }, i) => {
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
      })}
      {/* </div> */}
    </section>

  )
}
