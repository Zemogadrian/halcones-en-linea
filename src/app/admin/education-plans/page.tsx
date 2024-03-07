import { H1, Main, RedirectPlus, ShyScrollbar } from '@/components/utils'
import { getEducationPlans } from '@/services/supabase/actions'
import { v4 } from '@/utils/uuid'

export default async function EducationPlansPage () {
  const plans = await getEducationPlans()

  return (
    <Main>
      <div
        className='flex items-center justify-between mb-4'
      >
        <H1
          className='mb-0'
        >
          Planes de educación
        </H1>

        <RedirectPlus href='/admin/education-plans/new' />
      </div>

      <ul
        className='flex-1 overflow-y-auto'
        style={ShyScrollbar}
      >
        {plans.map((plan) => (
          <li
            className='text-lg font-medium text-white capitalize'
            key={v4()}
          >
            {plan.name}
          </li>
        ))}
      </ul>
    </Main>
  )
}
