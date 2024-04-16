'use client'
import { H1 } from '@/components/utils'
import { createActivityStore } from '@/stores/create-activity'

export function ActivitySection () {
  const { name, section } = createActivityStore(state => ({
    name: state.config.name,
    section: state.section
  }))

  console.log(section)

  return (
    <section>
      {section === 'activity-name' && (
        <H1>
          {name}
        </H1>
      )}
    </section>
  )
}
