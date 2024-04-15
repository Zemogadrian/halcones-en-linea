'use client'
import { createActivityStore } from '@/stores/create-activity'

export function ActivitySection () {
  const activityInfo = createActivityStore(state => state)

  return (
    <section>
      {activityInfo.config.name}
    </section>
  )
}
