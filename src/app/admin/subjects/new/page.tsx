import { Form, FormSection, H1, LabeledInput, Main, SubmitButton } from '@/components/utils'

export default function NewSubjectPage () {
  return (
    <Main>
      <H1>Crear materia</H1>

      <FormSection>
        <Form>
          <LabeledInput
            label='Nombre'
            name='name'
            type='text'
            required
            placeholder='Matemáticas'
          />

          <SubmitButton>
            Crear materia
          </SubmitButton>
        </Form>
      </FormSection>

    </Main>
  )
}
