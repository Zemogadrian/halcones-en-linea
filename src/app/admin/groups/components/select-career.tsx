'use client'

import { Select } from '@/components/utils'
import { ReducedCareer } from '@/services/supabase/types'
import { v4 } from '@/utils/uuid'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface Props {
  careers: ReducedCareer[]
}

export const SelectCareers = ({ careers }: Props) => {
  const { replace } = useRouter()
  const pathname = usePathname()
  const search = useSearchParams()
  const selectedCareer = search.get('career') ?? ''

  useEffect(() => {
    if (selectedCareer !== '') return

    const newSearch = new URLSearchParams(search)

    newSearch.set('career', careers[0].id.toString())

    replace(`${pathname}?${newSearch.toString()}`)
  }, [])

  return (
    <Select
      className='w-auto'
      onChange={(e) => {
        const newSearch = new URLSearchParams(search)

        newSearch.set('career', e.target.value)

        replace(`${pathname}?${newSearch.toString()}`)
      }}
      value={selectedCareer}
    >
      {careers.map((career) => (
        <option key={v4()} value={career.id}>{career.name}</option>
      ))}
    </Select>
  )
}
