import { H1, H2, Main } from '@/components/utils'
import { getProfessor, getProfessorCareers } from '@/services/supabase/actions'
import { AddClass } from './components/add-class'

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
      <H1 className='capitalize text-white'>{professor.first_name}</H1>

      <header className='flex justify-between'>
        <H2 className='text-white'>Clases</H2>

        <AddClass professorId={params.id} />
      </header>
    </Main>
  )
}
