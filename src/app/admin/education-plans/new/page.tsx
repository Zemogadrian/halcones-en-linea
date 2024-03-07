import { Form, H1, LabeledInput, Main, SubmitButton } from '@/components/utils'
import { createEducationPlan, getEducationPlan, getSubjects } from '@/services/supabase/actions'
import { SemesterSection } from './components/semester-section'

interface Props {
  params: {
    id: string
  }
  isEditMode?: boolean
}

export default async function NewEducationPlan ({ params, isEditMode = false }: Props) {
  const subjects = await getSubjects()

  const planEdu = isEditMode ? await getEducationPlan(params.id) : null

  return (
    <Main>
      <H1>Nuevo plan educativo</H1>

      <section className='flex-1'>
        <Form
          action={createEducationPlan}
          className='h-full flex flex-col'
        >
          <LabeledInput
            label='Nombre'
            name='name'
            type='text'
            placeholder='Plan edu 2024'
            required
            defaultValue={planEdu?.name}
          />

          <SemesterSection
            defaultValue={planEdu ?? undefined}
            subjects={subjects}
          />

          <SubmitButton>
            Crear plan educativo
          </SubmitButton>
        </Form>
      </section>
    </Main>
  )
}
