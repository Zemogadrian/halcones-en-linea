import { Form, H1, LabeledInput, Main, SubmitButton } from '@/components/utils'
import { createEducationPlan, getEducationPlan, getSubjects, updateEducationPlan } from '@/services/supabase/actions'
import { SemesterSection } from './components/semester-section'
import { Tables } from 'database.types'

interface Props {
  params: {
    id: string
  }
  isEditMode?: boolean
}

export default async function NewEducationPlan ({ params, isEditMode = false }: Props) {
  const planEdu = isEditMode ? await getEducationPlan(params.id) : null

  const materiasInPlan = planEdu?.semesters.reduce((acc, semester) => {
    // @ts-expect-error
    return acc.concat(semester.semester_subjects.map((ss) => ss.subject))
  }, []) as Array<Tables<'subjects'>>

  const subjects = isEditMode
    ? (await getSubjects()).filter((subject) => {
        return !materiasInPlan.some((materia) => materia.id === subject.id)
      })
    : await getSubjects()

  const action = async (data: FormData) => {
    'use server'

    const func = isEditMode && planEdu != null
      ? async () => await updateEducationPlan(planEdu, data)
      : async () => await createEducationPlan(data)

    await func()
  }

  return (
    <Main>
      <H1>Nuevo plan educativo</H1>

      <section className='flex-1'>
        <Form
          action={action}
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
