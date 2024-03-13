import { Form, FormSection, H1, LabeledInput, Main, LabeledSelect, SubmitButton } from '@/components/utils'
import { createCareer, getCampuses } from '@/services/supabase/actions'
import { v4 } from '@/utils/uuid'

export default async function NewCareerPage () {
  const campus = await getCampuses()

  return (
    <Main>
      <H1 className='text-white'>Crear carrera</H1>

      <FormSection>
        <Form action={createCareer}>
          <LabeledInput
            label='Nombre'
            name='name'
            type='text'
            required
            placeholder='Ingeniería en Sistemas Computacionales'
          />

          <LabeledInput
            label='RVOE'
            name='rvoe'
            type='text'
            required
            placeholder='RVOE-123456'
          />

          <LabeledSelect name='campus' label='Campus'>
            {campus.map((campus) => (
              <option
                key={v4()}
                value={campus.id}
              >
                {campus.name}
              </option>
            ))}
          </LabeledSelect>

          <SubmitButton>
            Crear carrera
          </SubmitButton>

        </Form>

      </FormSection>
    </Main>
  )
}
