import { Form, FormSection, H1, LabeledInput, Main, LabeledSelect, SubmitButton } from '@/components/utils'
import { createGroup, getReducedCareers } from '@/services/supabase/actions'

export default async function NewGroupPage () {
  const carears = await getReducedCareers()

  return (
    <Main>
      <H1 className='text-white'>Crear Grupo</H1>
      <FormSection>
        <Form action={createGroup}>
          <LabeledInput
            label='Grupo'
            name='name'
            type='text'
            required
            placeholder='Grupo A, Grupo B, etc...'
          />
          <LabeledSelect
            label='Carrera'
            name='career'
          >
            {carears.map((career) => (
              <option key={career.id} value={career.id}>{career.name}</option>
            ))}
          </LabeledSelect>
          <SubmitButton>Crear</SubmitButton>
        </Form>
      </FormSection>
    </Main>
  )
}
