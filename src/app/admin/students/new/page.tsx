import { USER_TYPES } from '@/services/supabase/functions/types'
import { RegisterForm } from '@/app/admin/components/register-form'
import { Main, H1, FormSection } from '@/components/utils'
import { getAccount } from '@/services/supabase/actions/auth'

interface Props {
  editMode?: boolean
  params?: {
    id: string
  }
}

export default async function NewStudentsPage ({ editMode, params }: Props) {
  const student = editMode != null ? await getAccount(params?.id ?? '') : null

  return (
    <Main>
      <H1>{editMode != null ? 'Editar alumno' : 'Crear nuevo alumno'}</H1>

      <FormSection>
        <RegisterForm defaultValues={student ?? undefined} role={USER_TYPES.STUDENT} />
      </FormSection>

    </Main>
  )
}
