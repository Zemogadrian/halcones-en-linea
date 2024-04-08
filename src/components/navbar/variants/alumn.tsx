'use client'

import { z } from 'zod'
import { NavBarItem } from '../types'
import { NavBar } from '../navbar'
import { UserWithRoles } from '@/services/supabase/types'
import { queryParamsSections, subjectRefs } from '@/app/student/enums'
import { useEffect } from 'react'
import { listenStartLiveClass } from '@/services/supabase/actions/students'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

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
  const { push } = useRouter()

  // TODO: finalizar la función de redirección para adquirir los parámetros necesarios de forma dinámica
  useEffect(() => {
    listenStartLiveClass()
      .then(e => {
        console.log('Listening to start live class:', e)
        toast.info('El profesor ha iniciado la clase', {
          action: {
            label: 'Ir a la clase',
            onClick (event) {
              console.log('Clicked on toast action:', event)
              push(
                '/live-class/licenciatura-en-psicolog%C3%ADa-educativa/ingenier%C3%ADa-civil?groupId=6&semesterId=29&educationPlanId=75&subjectId=2&careerId=4'
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
