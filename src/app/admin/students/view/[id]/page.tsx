import { H1, Main } from '@/components/utils'
import { getAccount } from '@/services/supabase/actions'
import { AddClassAsideContainer } from './components/add-class-aside-container'

interface Props {
  params: {
    id: string
  }
}

export default async function ViewStudentPage ({ params }: Props) {
  const student = await getAccount(params.id)

  console.log(student)

  return (
    <Main>
      <header className='flex justify-between mb-10'>
        <div>
          <H1 className='capitalize text-white'>{student.first_name}</H1>
        </div>
        <AddClassAsideContainer />
      </header>
    </Main>
  )
}
