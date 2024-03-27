'use client'

import { useParams, usePathname } from 'next/navigation'
import { z } from 'zod'
import Link from 'next/link'
import { setCookie } from '@/services/actions'
import { v4 } from '@/utils/uuid'

export const NavOptios = () => {
  const pathname = usePathname()
  const params = useParams()

  const options = [
    {
      startWith: '/student/subject',
      getRoutes: ({ params }) => {
        const subjectId = z.coerce.string().parse(params.id)

        return [
          {
            name: 'Temas',
            href: `/student/subject/${subjectId}/topics`,
            ref: 'topics'
          },
          {
            name: 'Documentación',
            href: `/student/subject/${subjectId}/documents`,
            ref: 'documents'
          },
          {
            name: 'Actividades',
            href: `/student/subject/${subjectId}/activities`,
            ref: 'activities'
          },
          {
            name: 'Examen',
            href: `/student/subject/${subjectId}/exam`,
            ref: 'exam'
          },
          {
            name: 'Clases grabadas',
            href: `/student/subject/${subjectId}/recordedclasses`,
            ref: 'recordedclasses'
          }
        ]
      }
    }
  ]

  const routes = options.find(({ startWith }) => pathname.startsWith(startWith))?.getRoutes({ params })

  if (routes == null) return null

  const handleNav = (ref) => () => {
    setCookie('calNav', ref)
      .catch(err => console.error(err))
  }

  return (
    <section className='flex flex-row text-xl h-full justify-center flex-1 items-center'>
      {/* <div className='flex flex-row text-xl h-full justify-center items-center'> */}
      {routes.map(({ name, href, ref }, i) => (
        <Link
          key={v4()}
          className={`
          flex border-r-[#27316e] px-2 py-1
          ${i === (routes.length - 1) ? '' : 'border-r-2'} 
          `}
          onClick={handleNav(ref)}
          href={href}
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
      ))}
      {/* </div> */}
    </section>

  )
}
