import { Form, H1, LabeledInput, Main, SubmitButton } from '@/components/utils'
import { getSubjects } from '@/services/supabase/actions'
import { SemesterSection } from './components/semester-section'
import { z } from 'zod'

export default async function NewEducationPlan () {
  const subjects = await getSubjects()

  const action = async (data: FormData) => {
    'use server'

    const entries = Object.fromEntries(data.entries())

    const [,...semesters] = Object.entries(entries).map(([key, value]) => {
      if (key.startsWith('subjects-')) {
        const newValue = z.coerce.string().parse(value)

        return {
          semester: key.split('-')[1],
          subjects: newValue.split(',')
        }
      }

      return null
    }).filter((value) => value != null)

    console.log(semesters)
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
          />

          <SemesterSection subjects={subjects} />

          <SubmitButton>
            Crear plan educativo
          </SubmitButton>
        </Form>
      </section>
    </Main>
  )
}
