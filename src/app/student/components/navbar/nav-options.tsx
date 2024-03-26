'use client'

import { usePathname } from 'next/navigation'
import { SubjectOptions } from './subject-options'

export const NavOptios = () => {
  const pathname = usePathname()

  if (pathname.startsWith('/student/subject')) {
    return (
      <SubjectOptions />
    )
  }
}
