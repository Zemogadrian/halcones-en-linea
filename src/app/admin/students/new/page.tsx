import { USER_TYPES } from '@/services/supabase/functions/types'
import { RegisterForm } from '../../components/register-form'
import { Main, H1, FormSection } from '@/components/utils'

export default function NewStudentsPage () {
  return (
    <Main>
      <H1>Crear nuevo alumno</H1>

      <FormSection>
        <RegisterForm role={USER_TYPES.STUDENT} />
      </FormSection>

    </Main>
  )
}
