'use client'

import { usePathname } from 'next/navigation'
import { SubjectOptions } from './subject-options'

export const NavOptios = () => {
  const pathname = usePathname()

  const options = [
    {
      startWith: '/student/subject',
      component: SubjectOptions
    }
  ]

  const Component = options.find(({ startWith }) => pathname.startsWith(startWith))?.component

  if (Component == null) return null

  return (
    <Component />
  )
}
