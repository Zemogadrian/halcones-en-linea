import { FormSection, H1, LabeledInput, Main, SubmitButton } from '@/components/utils'

export default function NewSubjectPage () {
  return (
    <Main>
      <H1>Crear materia</H1>

      <FormSection>
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
      </FormSection>

    </Main>
  )
}
