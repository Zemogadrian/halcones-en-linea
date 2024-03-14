import { H1, H2, Main } from '@/components/utils'
import { getProfessor, getProfessorSubjects } from '@/services/supabase/actions'
import { AddClass } from './components/add-class'

interface Props {
  params: {
    id: string
  }
}

export default async function ProfessorViewPage ({ params }: Props) {
  const professor = await getProfessor(params.id)

  const subjects = await getProfessorSubjects(params.id)

  console.log(subjects)

  return (
    <Main>
      <H1 className='capitalize text-white'>{professor.first_name}</H1>

      <section>
        <div className='flex justify-between'>
          <H2 className='text-white'>Clases</H2>

          <AddClass professorId={params.id} />
        </div>
      </section>
    </Main>
  )
}
