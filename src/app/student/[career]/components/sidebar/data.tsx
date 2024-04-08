import { SideBarOptions } from '@/components/sidebar/types'

export const options: SideBarOptions = [
  {
    title: 'Calendario',
    sub: [
      {
        title: 'Clases',
        href: '/student/[career]/calendar/classes'
      },
      {
        title: 'Dias inhabiles',
        href: '/student/[career]/calendar/nonworkingdays'
      },
      {
        title: 'Evaluaciones',
        href: '/student/[career]/calendar/exams'
      },
      {
        title: 'Vacaciones',
        href: '/student/[career]/calendar/vacations'
      },
      {
        title: 'Eventos',
        href: '/student/[career]/calendar/events'
      }

    ]
  },
  {
    title: 'Cursos / Diplomados / Seminarios',
    sub: [
      {
        title: 'Cursos',
        href: '/student/[career]/courses/cursos'
      }
    ]
  },
  {
    title: 'Serv. Administrativos',
    sub: [
      {
        title: 'Becas',
        href: '/student/[career]/servadmin/becas'
      },
      {
        title: 'Kárdex',
        href: '/student/[career]/servadmin/kardex'
      },
      {
        title: 'Constancia de estudios',
        href: '/student/[career]/servadmin/constancia'
      },
      {
        title: 'Métodos de pago',
        href: '/student/[career]/servadmin/metodospago'
      }

    ]
  },
  {
    title: 'Foros',
    sub: [
      {
        title: 'Foros',
        href: '/student/[career]/forums'
      }
    ]
  }
]
