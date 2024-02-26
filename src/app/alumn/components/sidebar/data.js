export const routes = {
  admin: {
    title: 'Overview',
    href: '/admin',
    isMultiple: false,
    multipleOptions: []
  },
  plans: {
    title: 'Planes',
    href: '/admin/plans',
    isMultiple: true,
    multipleOptions: [
      {
        title: 'Crear plan',
        href: '/create'
      },
      {
        title: 'Estadisticas',
        href: '/stats'
      }
    ]
  },
  users: {
    title: 'Usuarios',
    href: '/admin/users',
    isMultiple: true,
    multipleOptions: [
      {
        title: 'Estadisticas',
        href: '/stats'
      }
    ]
  }
}
