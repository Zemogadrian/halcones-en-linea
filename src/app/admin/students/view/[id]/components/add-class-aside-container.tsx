'use client'

import { AsideFadeIn } from '@/components/aside-fade-in'
import { PlusButton } from '@/components/utils'

export const AddClassAsideContainer = () => (
  <AsideFadeIn
    Button={(props) => (
      <PlusButton {...props} />
    )}
    Render={({ close }) => (
      <>

      </>
    )}
  />
)
