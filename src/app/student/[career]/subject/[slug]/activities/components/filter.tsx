'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export const Filter = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [filter, setFilter] = useState(searchParams.get('filter') ?? 'all')

  return (
    <select
      onChange={(e) => {
        const newFilter = e.target.value
        setFilter(newFilter)

        const newSearchParams = new URLSearchParams(searchParams)

        newSearchParams.set('filter', newFilter)

        router.push(
            `${pathname}?${newSearchParams.toString()}`
        )
      }}
      value={filter}
    >
      <option value='all'>Todas</option>
      <option value='delivered'>Entregadas</option>
      <option value='not-delivered'>No entregadas</option>
    </select>
  )
}
