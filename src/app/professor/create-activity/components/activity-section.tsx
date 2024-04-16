'use client'
import { H1 } from '@/components/utils'
import { createActivityStore } from '@/stores/create-activity'
import { useSearchParams } from 'next/navigation'

export function ActivitySection () {
  const searchParams = useSearchParams()

  const { name, section } = createActivityStore(state => ({
    name: state.config.name,
    section: state.section
  }))

  return (
    <section>
      {section === 'activity-name' && (
        <H1>
          {name === '' ? searchParams.get('activity-name') : name}
        </H1>
      )}
    </section>
  )
}
