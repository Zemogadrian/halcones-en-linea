import { Form, FormSection, H1, LabeledInput, Main, Select, SubmitButton } from '@/components/utils'
import { createGroup, getCareers } from '@/services/supabase/actions'

export default async function NewGroupPage () {
  const carears = await getCareers()
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
          <Select
            label='Carrera'
            name='career'
          >
            {carears.map((career) => (
              <option key={career.id} value={career.id}>{career.name}</option>
            ))}
          </Select>
          <SubmitButton>Crear</SubmitButton>
        </Form>
      </FormSection>
    </Main>
  )
}
