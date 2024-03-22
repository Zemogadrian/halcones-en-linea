'use client'

import { IconPlus } from '@tabler/icons-react'
import { AddClassForm } from './add-class-form'
import { AsideFadeIn } from '@/components/aside-fade-in'

interface Props {
  professorId: string
}

export const AddClass = ({ professorId }: Props) => {
  return (
    <AsideFadeIn
      Button={(props) => (
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded transition-colors'
          {...props}
        >
          <IconPlus size={20} />
        </button>
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
