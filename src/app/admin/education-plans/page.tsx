import { H1, Main, RedirectPlus, THeadSticky, Table, TableContainer, Td, Th } from '@/components/utils'
import { getEducationPlans } from '@/services/supabase/actions'
import { dateFormatter } from '@/utils/formatters'
import { v4 } from '@/utils/uuid'
import { IconEdit } from '@tabler/icons-react'
import Link from 'next/link'

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

      <TableContainer>
        <Table>
          <THeadSticky>
            <tr>
              <Th>
                Nombre
              </Th>
              <Th>Semestres</Th>
              <Th>Fecha de creacion</Th>
              <Th>Acciones</Th>
            </tr>
          </THeadSticky>
          <tbody>
            {plans.map((plan, i) => (
              <tr
                key={v4()}
                className='border-b border-b-itesus-tertiary'
              >
                <Td
                  className='capitalize'
                >
                  {plan.name}
                </Td>
                <Td>
                  {plan.semesters.length}
                </Td>
                <Td>
                  {dateFormatter(new Date(plan.created_at), 'es-MX')}
                </Td>
                <Td
                  className='py-1'
                >
                  <div className='flex justify-center items-center'>
                    <Link
                      href={`/admin/education-plans/edit/${plan.id}`}
                      className='p-1 bg-itesus-primary rounded-md cursor-pointer hover:bg-itesus-secondary transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-itesus-secondary focus:border-transparent'
                    >
                      <IconEdit
                        size={20}
                      />
                    </Link>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Main>
  )
}
