'use client'

import { useParams, usePathname } from 'next/navigation'
import { z } from 'zod'
import Link from 'next/link'
import { setCookie } from '@/services/actions'

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
    <div className='flex flex-row text-xl h-full justify-center items-center'>
      {routes.map(({ name, href, ref }, i) => (
        <div className={`flex  ${i === (routes.length - 1) ? '' : 'border-r-2'} border-r-[#27316e] px-2 py-1`} key={name}>
          <Link onClick={handleNav(ref)} href={href}>
            <span
              className={` px-2
          ${pathname === href ? 'text-[#fff] bg-gradient-to-tr from-[#1f5186] to-[#131a2d] rounded-lg' : 'text-[#27316e]'}
          hover:text-[#fff] hover:bg-gradient-to-tr from-[#1f5186] to-[#131a2d] hover:rounded-lg
        `}
            >
              {name}
            </span>
          </Link>
        </div>
      ))}
    </div>
  )
}
