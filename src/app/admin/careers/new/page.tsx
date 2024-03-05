import { Form, FormSection, H1, LabeledInput, Main } from '@/components/utils'
import { getCampuses } from '@/services/supabase/actions'
import { v4 } from '@/utils/uuid'

export default async function NewCareerPage () {
  const campus = await getCampuses()

  console.log(campus)

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

          <select>
            {campus.map((campus) => (
              <option key={v4()} value={campus.id}>{campus.name}</option>
            ))}
          </select>

        </Form>

      </FormSection>
    </Main>
  )
}
