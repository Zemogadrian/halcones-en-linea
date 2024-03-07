import { H1, Main } from '@/components/utils'
import { getSubjects } from '@/services/supabase/actions'
import { v4 } from '@/utils/uuid'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'

export default async function SubjectsPage () {
  const subjects = await getSubjects()

  return (
    <Main>
      <div
        className='flex items-center justify-between mb-4'
      >
        <H1
          className='mb-0'
        >
          Materias
        </H1>

        <Link
          href='/admin/subjects/new'
          className='p-1 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600 transition-colors duration-300 ease-in-out'
        >
          <IconPlus color='#fff' />
        </Link>
      </div>

      <ul
        className='flex-1 overflow-y-auto'
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent'
        }}
      >
        {subjects.map((subject, i) => (
          <li
            key={v4()}
            className='text-lg font-medium text-white capitalize'
          >
            {i + 1}- {subject.name}
          </li>
        ))}
      </ul>
    </Main>
  )
}
