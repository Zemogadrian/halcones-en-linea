import { H1, Main } from '@/components/utils'
import { getAccount, getStudentClasses } from '@/services/supabase/actions'
import { AddClassAsideContainer } from './components/add-class-aside-container'

interface Props {
  params: {
    id: string
  }
}

export default async function ViewStudentPage ({ params }: Props) {
  const student = await getAccount(params.id)
  const studentClasses = await getStudentClasses(params.id)

  console.log(student)
  console.log(studentClasses)

  return (
    <Main>
      <header className='flex justify-between mb-10'>
        <div>
          <H1 className='capitalize text-white'>{student.first_name}</H1>
        </div>
        <AddClassAsideContainer studentId={params.id} />
      </header>
    </Main>
  )
}
