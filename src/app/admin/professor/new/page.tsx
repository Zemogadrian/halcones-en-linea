import { USER_TYPES } from '@/services/supabase/functions/types'
import { RegisterForm } from '@/app/admin/components/register-form'
import { Main, H1, FormSection } from '@/components/utils'
import { getAccount } from '@/services/supabase/actions/auth'

interface Props {
  params?: {
    id: string
  }
}

export default async function NewProfessorPage ({ params }: Props) {
  const editMode = params?.id != null

  const professor = editMode != null ? await getAccount(params?.id ?? '') : null

  return (
    <Main>
      <H1>
        {editMode != null ? 'Editar profesor' : 'Crear nuevo profesor'}
      </H1>

      <FormSection>
        <RegisterForm
          defaultValues={professor ?? undefined}
          from='professor' role={USER_TYPES.PROFESSOR}
        />
      </FormSection>

    </Main>
  )
}
