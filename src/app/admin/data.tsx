import { SideBarOptions } from '@/components/sidebar/types'

export const routes: SideBarOptions = [
  {
    title: 'Alumnos',
    sub: [
      {
        href: '/admin/students',
        title: 'Lista de alumnos'
      },
      {
        href: '/admin/students/new',
        title: 'Nuevo alumno'
      },
      {
        href: '/admin/students/grades',
        title: 'Calificaciones'
      }
    ]
  },
  {
    title: 'Carreras',
    sub: [
      {
        href: '/admin/careers',
        title: 'Lista de carreras'
      },
      {
        href: '/admin/careers/new',
        title: 'Nueva carrera'
      }
    ]
  },
  {
    title: 'Materias',
    sub: [
      {
        href: '/admin/subjects',
        title: 'Lista de materias'
      },
      {
        href: '/admin/subjects/new',
        title: 'Nueva materia'
      }
    ]
  },
  {
    title: 'Profesores',
    sub: [
      {
        href: '/admin/professor',
        title: 'Lista de profesores'
      },
      {
        href: '/admin/professor/new',
        title: 'Nuevo profesor'
      }
    ]
  }
]
