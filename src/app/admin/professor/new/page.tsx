import { USER_TYPES } from '@/services/supabase/functions/types'
import { RegisterForm } from '@/app/admin/components/register-form'
import { Main, H1, FormSection } from '@/components/utils'

export default function NewProfessorPage () {
  return (
    <Main>
      <H1>Crear nuevo profesor</H1>

      <FormSection>
        <RegisterForm role={USER_TYPES.PROFESSOR} />
      </FormSection>

    </Main>
  )
}
