import { H1, H2, H3, H4, Main, ShyScrollbar, THeadSticky, Table, TableContainer, Td, Th, Tr } from '@/components/utils'
import { getProfessor, getProfessorCareers } from '@/services/supabase/actions'
import { AddClass } from './components/add-class'
import { v4 } from '@/utils/uuid'

interface Props {
  params: {
    id: string
  }
}

export default async function ProfessorViewPage ({ params }: Props) {
  const professor = await getProfessor(params.id)

  const careers = await getProfessorCareers(params.id)

  console.log(careers)

  return (
    <Main>

      <header className='flex justify-between mb-10'>
        <div>
          <H1 className='capitalize text-white'>{professor.first_name}</H1>
        </div>
        <AddClass professorId={params.id} />
      </header>

      <section className='flex-1 flex flex-col overflow-hidden'>
        <H2 className='text-white mb-4'>Carreras</H2>

        <div style={ShyScrollbar} className='grid grid-cols-2 gap-2 flex-1 overflow-y-auto'>
          {careers.map(c => (
            <article key={v4()} className='bg-white rounded-md p-4'>
              <H3 className='capitalize'>{c.name}</H3>

              <ul className='flex flex-col w-full gap-3'>
                {c.educationPlans.map(p => (
                  <li key={v4()} className='capitalize'>
                    <H4>{p.name}</H4>

                    {p.groups.map(g => (
                      <TableContainer key={v4()}>
                        <Table>
                          <THeadSticky>
                            <tr>
                              <Th className='text-black text-center'>{g.name}</Th>
                              {g.semesters.map(s => (
                                <Th className='text-black text-center' key={v4()}>Semestre {s.number}</Th>
                              ))}
                            </tr>
                          </THeadSticky>

                          <tbody>
                            {Array.from({
                              length: g.semesters.reduce((acc, curr) => {
                                if (curr.subjects.length > acc) {
                                  return curr.subjects.length
                                }

                                return acc
                              }, 0)
                            }).map((_, i) => {
                              return (
                                <Tr key={v4()}>
                                  <td />
                                  {g.semesters.map(s => (
                                    <Td className='text-black text-center' key={v4()}>{s.subjects[i]?.name}</Td>
                                  ))}
                                </Tr>
                              )
                            })}
                          </tbody>
                        </Table>
                      </TableContainer>
                    ))}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* <div className='grid grid-cols-3 gap-2'>
          {careers.map((career) => (
            <article key={v4()} className='bg-white p-4 rounded-lg'>
              <H3 className='capitalize'>{career.name}</H3>

              {career.educationPlans.map((plan) => (
                <div key={v4()}>
                  <H4 className='capitalize'>
                    <span className='font-normal'>- </span>
                    {plan.name}
                  </H4>

                  <div className='ml-4'>
                    {plan.groups.map((group) => (
                      <div key={v4()}>
                        <H5><span>-</span> {group.name}</H5>

                        <div className='ml-4'>
                          {group.semesters.map((semesters) => (
                            <div key={v4()}>
                              <H6>Semestre {semesters.number}</H6>

                              {semesters.subjects.map((subject) => (
                                <div key={v4()}>
                                  <p>{subject.name}</p>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </article>
          ))}
        </div> */}
      </section>
    </Main>
  )
}
