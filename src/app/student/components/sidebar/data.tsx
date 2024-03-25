import { SideBarOptions } from '../../../../components/sidebar/types'

export const options: SideBarOptions = [
  {
    title: 'Calendario',
    sub: [
      {
        title: 'Clases',
        href: '/student/calendar/classes'
      },
      {
        title: 'Dias inhabiles',
        href: '/student/calendar/nonworkingdays'
      },
      {
        title: 'Evaluaciones',
        href: '/student/calendar/exams'
      },
      {
        title: 'Vacaciones',
        href: '/student/calendar/vacations'
      },
      {
        title: 'Eventos',
        href: '/student/calendar/events'
      }

    ]
  },
  {
    title: 'Cursos / Diplomados / Seminarios',
    sub: [
      {
        title: 'Cursos',
        href: '/student/courses/cursos'
      }
    ]
  },
  {
    title: 'Serv. Administrativos',
    sub: [
      {
        title: 'Becas',
        href: '/student/servadmin/becas'
      },
      {
        title: 'Kárdex',
        href: '/student/servadmin/kardex'
      },
      {
        title: 'Constancia de estudios',
        href: '/student/servadmin/constancia'
      },
      {
        title: 'Métodos de pago',
        href: '/student/servadmin/metodospago'
      }

    ]
  },
  {
    title: 'Foros',
    sub: [
      {
        title: 'Foros',
        href: '/student/forums'
      }
    ]
  }
]
