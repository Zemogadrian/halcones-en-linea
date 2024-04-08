'use client'

import { z } from 'zod'
import { NavBarItem } from '../types'
import { NavBar } from '../navbar'
import { UserWithRoles } from '@/services/supabase/types'
import { queryParamsSections, subjectRefs } from '@/app/student/enums'

const navOptions: NavBarItem[] = [
  {
    startWith: '/student/subject',
    getRoutes: ({ params }) => {
      const slug = z.coerce.string().parse(params.slug)

      const queryParam = queryParamsSections.subjectSection

      return [
        {
          name: 'Temas',
          href: `/student/subject/${slug}/topics`,
          ref: subjectRefs.topics,
          queryParam
        },
        {
          name: 'Documentación',
          href: `/student/subject/${slug}/documents`,
          ref: subjectRefs.documents,
          queryParam
        },
        {
          name: 'Actividades',
          href: `/student/subject/${slug}/activities`,
          ref: subjectRefs.activities,
          queryParam
        },
        {
          name: 'Examen',
          href: `/student/subject/${slug}/exam`,
          ref: subjectRefs.exam,
          queryParam
        },
        {
          name: 'Clases grabadas',
          href: `/student/subject/${slug}/recordedclasses`,
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
  return <NavBar {...props} options={navOptions} />
}
