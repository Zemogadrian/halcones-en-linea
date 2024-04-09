'use client'

import { NavBarItem } from '../types'
import { NavBar } from '../navbar'
import { UserWithRoles } from '@/services/supabase/types'
import { queryParamsSections, subjectRefs } from '@/app/professor/career/[slug]/enums'
import { startClass } from '@/services/supabase/actions/professors'

const options: NavBarItem[] = [
  {
    startWith: '/professor/career/[slug]/[subjectslug]',
    getRoutes: ({ queryParams }) => {
      const queryParam = queryParamsSections.professorSubject

      return [
        {
          name: 'Horario',
          href: '/professor/career/[slug]/[subjectslug]/schedule',
          ref: subjectRefs.schedule,
          queryParam
        },
        {
          name: 'Actividades',
          href: '/professor/career/[slug]/[subjectslug]/activities',
          ref: subjectRefs.activities,
          queryParam
        },
        {
          name: 'Foros',
          href: '/professor/career/[slug]/[subjectslug]/forums',
          ref: subjectRefs.forums,
          queryParam
        },
        {
          name: 'Temas y Documentación',
          href: '/professor/career/[slug]/[subjectslug]/documentation',
          ref: subjectRefs.documentation,
          queryParam
        },
        {
          name: 'Calificaciones',
          href: '/professor/career/[slug]/[subjectslug]/qualifications',
          ref: subjectRefs.qualifications,
          queryParam
        },
        {
          name: 'Iniciar clase',
          href: '/live-class/[slug]/[subjectslug]',
          target: '_blank',
          onClick: () => {
            const convertToNumber = (value: string | null) => parseInt(value ?? '0')

            startClass({
              careerId: convertToNumber(queryParams.get('careerId')),
              educationPlanId: convertToNumber(queryParams.get('educationPlanId')),
              groupId: convertToNumber(queryParams.get('groupId')),
              semesterId: convertToNumber(queryParams.get('semesterId')),
              subjectId: convertToNumber(queryParams.get('subjectId'))
            })
              .catch((error) => {
                console.log('Error starting class', error)
              })
          }
        }
      ]
    }
  }
]

interface Props {
  user?: UserWithRoles | null
}

export const NavBarProf = (props: Props) => <NavBar {...props} options={options} />
