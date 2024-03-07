import { H1, Main, RedirectPlus, Td, Th } from '@/components/utils'
import { getEducationPlans } from '@/services/supabase/actions'
import { v4 } from '@/utils/uuid'
import { IconEdit } from '@tabler/icons-react'

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

      {/* <ul
        className='flex-1 overflow-y-auto'
        style={ShyScrollbar}
      >
        {plans.map((plan, i) => (
          <li
            className='text-lg font-medium text-white capitalize'
            key={v4()}
          >
            {i + 1}- {plan.name}
          </li>
        ))}
      </ul> */}

      <div
        className='relative overflow-y-auto flex-1'
      >
        <table className='w-full'>
          <thead
            className='sticky top-0 bg-itesus-primary/50 backdrop-blur-sm text-white'
          >
            <tr>
              <Th>
                Nombre
              </Th>
              <Th>Semestres</Th>
              <Th>Fecha de creacion</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan, i) => (
              <tr
                key={v4()}
                className='py-1 border-b border-b-itesus-tertiary'
              >
                <Td className='text-white px-3'>
                  {plan.name}
                </Td>
                <Td className='text-center'>
                  {plan.semester_quantity}
                </Td>
                <Td>
                  {plan.created_at}
                </Td>
                <Td>
                  <button
                    className=''
                  >
                    <IconEdit />
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Main>
  )
}
