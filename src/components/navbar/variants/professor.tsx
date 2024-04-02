'use client'

import { z } from 'zod'
import { NavBarItem } from '../types'
import { NavBar } from '../navbar'
import { UserWithRoles } from '@/services/supabase/types'
import { queryParamsSections, subjectRefs } from '@/app/professor/career/[slug]/enums'

const options: NavBarItem[] = [
  {
    startWith: '/professor',
    getRoutes: ({ params }) => {
      if (params.slug == null || params.subjectslug == null) return []

      const slug = z.coerce.string().parse(params.slug)
      const subjectslug = z.coerce.string().parse(params.subjectslug)
      const queryParam = queryParamsSections.professorSubject

      return [
        {
          name: 'Horario',
          href: `/professor/career/${slug}/${subjectslug}/schedule`,
          ref: subjectRefs.schedule,
          queryParam
        },
        {
          name: 'Actividades',
          href: `/professor/career/${slug}/${subjectslug}/activities`,
          ref: subjectRefs.activities,
          queryParam
        },
        {
          name: 'Examenes',
          href: `/professor/career/${slug}/${subjectslug}/tests`,
          ref: subjectRefs.tests,
          queryParam
        },
        {
          name: 'Foros',
          href: `/professor/career/${slug}/${subjectslug}/forums`,
          ref: subjectRefs.forums,
          queryParam
        },
        {
          name: 'Temas y Documentación',
          href: `/professor/career/${slug}/${subjectslug}/documentation`,
          ref: subjectRefs.documentation,
          queryParam
        },
        {
          name: 'Calificaciones',
          href: `/professor/career/${slug}/${subjectslug}/qualifications`,
          ref: subjectRefs.qualifications,
          queryParam
        },
        {
          name: 'Iniciar clase',
          href: `/live-class/${slug}/${subjectslug}`
        }
      ]
    }
  }
]

interface Props {
  user?: UserWithRoles | null
}

export const NavBarProf = (props: Props) => <NavBar {...props} options={options} />
