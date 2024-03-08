import { Form, FormSection, H1, LabeledInput, Main, Select, SubmitButton } from '@/components/utils'
import { getCampuses, getEducationPlans } from '@/services/supabase/actions'
import { v4 } from '@/utils/uuid'

export default async function NewCareerPage () {
  const campus = await getCampuses()
  const plans = await getEducationPlans()

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

          <Select label='Campus'>
            {campus.map((campus) => (
              <option
                key={v4()}
                value={campus.id}
              >
                {campus.name}
              </option>
            ))}
          </Select>

          <Select label='Plan de estudios'>
            {plans.map((plan) => (
              <option
                key={v4()}
                value={plan.id}
              >
                {plan.name}
              </option>
            ))}
          </Select>

          <SubmitButton>
            Crear carrera
          </SubmitButton>

        </Form>

      </FormSection>
    </Main>
  )
}
