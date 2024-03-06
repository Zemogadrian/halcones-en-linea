import { Form, H1, LabeledInput, Main } from '@/components/utils'
import { getSubjects } from '@/services/supabase/actions'
import { SemesterSection } from './components/semester-section'

export default async function NewEducationPlan () {
  const subjects = await getSubjects()

  return (
    <Main>
      <H1>Nuevo plan educativo</H1>

      <section>
        <Form>
          <LabeledInput
            label='Nombre'
            name='name'
            type='text'
            placeholder='Plan edu 2024'
            required
          />

          <SemesterSection subjects={subjects} />
        </Form>
      </section>
    </Main>
  )
}
