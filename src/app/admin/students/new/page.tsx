import { USER_TYPES } from '@/services/supabase/functions/types'
import { RegisterForm } from '@/app/admin/components/register-form'
import { Main, H1, FormSection } from '@/components/utils'
import { getAccount } from '@/services/supabase/actions/auth'

interface Props {
  params?: {
    id: string
  }
}

export default async function NewStudentsPage ({ params }: Props) {
  const editMode = params?.id != null

  const student = editMode != null ? await getAccount(params?.id ?? '') : null

  return (
    <Main>
      <H1>{editMode != null ? 'Editar alumno' : 'Crear nuevo alumno'}</H1>

      <FormSection>
        <RegisterForm from='students' defaultValues={student ?? undefined} role={USER_TYPES.STUDENT} />
      </FormSection>

    </Main>
  )
}
