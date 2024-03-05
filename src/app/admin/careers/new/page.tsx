import { Form, FormSection, H1, LabeledInput, Main, Select } from '@/components/utils'
import { getCampuses } from '@/services/supabase/actions'
import { v4 } from '@/utils/uuid'

export default async function NewCareerPage () {
  const campus = await getCampuses()

  return (
    <Main>
      <H1>Crear carrera</H1>

      <FormSection>

        <Form>
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

          <Select>
            {campus.map((campus) => (
              <option
                key={v4()}
                value={campus.id}
              >
                {campus.name}
              </option>
            ))}
          </Select>

        </Form>

      </FormSection>
    </Main>
  )
}
