'use client'

import { AddClassForm } from '../../../../components/add-class-form'
import { AsideFadeIn } from '@/components/aside-fade-in'
import { PlusButton } from '@/components/utils'
import { assingProfessorToSubject } from '@/services/supabase/actions/admin/professor'

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
          metadata={{
            professor: professorId
          }}
          action={assingProfessorToSubject}
          {...props}
        />
      )}
    />
  )
}
