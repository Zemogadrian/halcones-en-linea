export const routes = {
  materias: {
    title: 'Materias',
    href: '/subjects',
    isMultiple: false,
    multipleOptions: [
      {
        title:'Introducción a los negocios',
        href:'/subjects/1'
      },
      {
        title:'Matemáticas para la mercadotecnia',
        href:'/subjects/2'
      },
      {
        title:'Contabilidad I',
        href:'/subjects/3'
      },
      {
        title:'Administración Global I',
        href:'/subjects/4'
      },
      {
        title:'Computación I',
        href:'/subjects/5'
      },
      {
        title:'Redacción avanzada en español',
        href:'/subjects/6'
      },
      {
        title:'Inglés I',
        href:'/subjects/7'
      }

    ]
  },
  calendario: {
    title: 'Calendario',
    href: '/calendar',
    isMultiple: true,
    multipleOptions: [
    ]
  },
  Courses: {
    title: 'Cursos',
    href: '/courses',
    isMultiple: true,
    multipleOptions: [
    ]
  },
  AdminServices: {
    title: 'Serv. Administrativos',
    href: '/servadmin',
    isMultiple: true,
    multipleOptions: [
      {
        title: 'Kárdex',
        href: '/servadmin/kardex'
      }
    ]
  },
  Forums: {
    title: 'Foros',
    href: '/forums',
    isMultiple: true,
    multipleOptions: [
      {
        title: 'Nuevo Tema',
        href: '/forums/new-topic'
      }
    ]
  }
}
