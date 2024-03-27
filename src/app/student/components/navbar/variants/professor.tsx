'use client'

import { z } from 'zod'
import { NavBarItem } from '../types'
import { NavBar } from '../navbar'
import { UserWithRoles } from '@/services/supabase/types'
import { queryParamsSections, subjectRefs } from '@/app/professor/career/[slug]/layout'

const options: NavBarItem[] = [
  {
    startWith: '/professor',
    getRoutes: ({ params }) => {
      const subject = decodeURIComponent(z.coerce.string().parse(params.slug))

      const queryParam = queryParamsSections.professorSubject

      return [
        {
          name: 'Horario',
          href: `/professor/${subject}/schedule`,
          ref: subjectRefs.schedule,
          queryParam
        },
        {
          name: 'Actividades',
          href: `/professor/${subject}/Activities`,
          ref: subjectRefs.activities,
          queryParam
        },
        {
          name: 'Examenes',
          href: `/professor/${subject}/tests`,
          ref: subjectRefs.tests,
          queryParam
        },
        {
          name: 'Foros',
          href: `/professor/${subject}/forums`,
          ref: subjectRefs.forums,
          queryParam
        },
        {
          name: 'Temas y Documentación',
          href: `/professor/${subject}/documentation`,
          ref: subjectRefs.documentation,
          queryParam
        },
        {
          name: 'Calificaciones',
          href: `/professor/${subject}/qualifications`,
          ref: subjectRefs.qualifications,
          queryParam
        },
        {
          name: 'Iniciar clase',
          href: `/professor/${subject}/beginclass`,
          ref: subjectRefs.beginclass,
          queryParam
        }
      ]
    }
  }
]

interface Props {
  user?: UserWithRoles | null
}

export const NavBarProf = (props: Props) => <NavBar {...props} options={options} />
