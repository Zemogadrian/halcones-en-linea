'use client'

import { Input } from '@/components/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const SearchInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams)

    if (event.target.value === '') newSearchParams.delete('q')
    else newSearchParams.set('q', event.target.value)

    replace(`${pathname}?${newSearchParams.toString()}`)
  }

  return (
    <Input
      type='search'
      onChange={search}
      {...props}
    />
  )
}
