'use client'

import { z } from 'zod'
import { NavBarItem } from '../types'
import { NavBar } from '../navbar'
import { UserWithRoles } from '@/services/supabase/types'
import { queryParamsSections, subjectRefs } from '@/app/student/[career]/enums'
import { useEffect } from 'react'
import { listenStartLiveClass } from '@/services/supabase/actions/students'
import { toast } from 'sonner'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { pathnameFormatter } from '@/utils/formatters'

const navOptions: NavBarItem[] = [
  {
    startWith: '/student/[career]/subject',
    getRoutes: ({ params }) => {
      const slug = z.coerce.string().parse(params.slug)

      const queryParam = queryParamsSections.subjectSection

      return [
        {
          name: 'Temas',
          href: `/student/[career]/subject/${slug}/topics`,
          ref: subjectRefs.topics,
          queryParam
        },
        {
          name: 'Documentación',
          href: `/student/[career]/subject/${slug}/documents`,
          ref: subjectRefs.documents,
          queryParam
        },
        {
          name: 'Actividades',
          href: `/student/[career]/subject/${slug}/activities`,
          ref: subjectRefs.activities,
          queryParam
        },
        {
          name: 'Examen',
          href: `/student/[career]/subject/${slug}/exam`,
          ref: subjectRefs.exam,
          queryParam
        },
        {
          name: 'Clases grabadas',
          href: `/student/[career]/subject/${slug}/recordedclasses`,
          ref: subjectRefs.recordedclasses,
          queryParam
        }
      ]
    }
  }
]

interface Props {
  user?: UserWithRoles | null
}

export const NavBarStudent = (props: Props) => {
  const { push } = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()

  console.log(
  )

  useEffect(() => {
    listenStartLiveClass()
      .then(e => {
        const search = Object.fromEntries(searchParams.entries())
        const { subjectSlug, subject, career, plan, group, semester } = e.payload

        if (
          career !== parseInt(search.careerId ?? '') ||
          plan !== parseInt(search.educationPlanId ?? '') ||
          group !== parseInt(search.groupId ?? '') ||
          semester !== parseInt(search.semesterId ?? '')
        ) return console.log('No match')

        toast.info('El profesor ha iniciado la clase', {
          action: {
            label: 'Unirse',
            onClick () {
              const searchParamsToAdd = {
                subjectId: subject.toString()
              }

              const newSearchParams = new URLSearchParams(searchParams.toString())

              Object.entries(searchParamsToAdd).forEach(([key, value]) => {
                newSearchParams.set(key, value)
              })

              push(
                pathnameFormatter(
                  `/live-class/[career]/${subjectSlug}?${newSearchParams.toString()}`,
                  params
                )
              )
            }
          },
          style: {
            backgroundColor: 'var(--itesus-primary)'
          },
          duration: 5000
        })
      })
      .catch(err => console.log('Error listening to start live class:', err))
  }, [])

  return <NavBar {...props} options={navOptions} />
}
