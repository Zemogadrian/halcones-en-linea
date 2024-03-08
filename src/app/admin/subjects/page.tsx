import { H1, Main, RedirectPlus, ShyScrollbar } from '@/components/utils'
import { getSubjects } from '@/services/supabase/actions'
import { v4 } from '@/utils/uuid'

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

        <RedirectPlus href='/admin/subjects/new' />
      </div>

      <ul
        className='flex-1 overflow-y-auto'
        style={ShyScrollbar}
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
