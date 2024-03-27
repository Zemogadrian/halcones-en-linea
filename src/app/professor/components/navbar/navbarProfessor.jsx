'use client'
import { useParams, usePathname } from 'next/navigation'
import { z } from 'zod'
import Link from 'next/link'
import { setCookie } from '@/services/actions'
import { v4 } from '@/utils/uuid'

export const NavProfOptions = () => {
  const pathname = usePathname()
  const params = useParams()

  console.log(params)

  const options = [
    {
      startWith: '/professor/',
      getRoutes: ({ params }) => {
        const subject = z.coerce.string().parse(params.slug)

        return [
          {
            name: 'Horario',
            href: `/professor/${subject}/schedule`,
            ref: 'Horario'
          },
          {
            name: 'Actividades',
            href: `/professor/${subject}/Activities`,
            ref: 'Actividades'
          },
          {
            name: 'Examenes',
            href: `/professor/${subject}/tests`,
            ref: 'Examenes'
          },
          {
            name: 'Foros',
            href: `/professor/${subject}/forums`,
            ref: 'Foros'
          },
          {
            name: 'Temas y Documentación',
            href: `/professor/${subject}/documentation`,
            ref: 'Temas'
          },
          {
            name: 'Calificaciones',
            href: `/professor/${subject}/qualifications`,
            ref: 'Calificaciones'
          },
          {
            name: 'Iniciar clase',
            href: `/professor/${subject}/beginclass`,
            ref: 'clase'
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
    <section className='flex flex-row text-xl justify-center items-center bg-[#cdcccb] h-16'>
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
