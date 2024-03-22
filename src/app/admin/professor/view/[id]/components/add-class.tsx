'use client'

import { AddClassForm } from './add-class-form'
import { AsideFadeIn } from '@/components/aside-fade-in'
import { PlusButton } from '@/components/utils'

interface Props {
  professorId: string
}

export const AddClassAsideContainer = ({ professorId }: Props) => {
  return (
    <AsideFadeIn
      Button={(props) => (
        <PlusButton
          {...props}
        />
      )}
      Render={(props) => (
        <AddClassForm
          professorId={professorId}
          {...props}
        />
      )}
    />
  )
}
