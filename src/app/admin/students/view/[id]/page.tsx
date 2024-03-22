import { H1, Main } from '@/components/utils'
import { getAccount } from '@/services/supabase/actions'
import { IconPlus } from '@tabler/icons-react'

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
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded transition-colors'
        >
          <IconPlus size={20} />
        </button>
      </header>
    </Main>
  )
}
