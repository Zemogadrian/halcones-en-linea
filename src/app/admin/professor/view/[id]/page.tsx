import { H1, H2, Main } from '@/components/utils'
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

      <section>
        <H2 className='text-white mb-4'>Carreras</H2>

        <div className='grid grid-cols-3 gap-2'>
          {careers.map(c => (
            <article key={v4()}>
              a
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
