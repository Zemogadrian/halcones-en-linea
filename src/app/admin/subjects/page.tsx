import { H1, Main } from '@/components/utils'
import { getSubjects } from '@/services/supabase/actions'
import { v4 } from '@/utils/uuid'

export default async function SubjectsPage () {
  const subjects = await getSubjects()

  return (
    <Main>
      <H1>Materias</H1>

      <ul
        className='space-y-2'
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
