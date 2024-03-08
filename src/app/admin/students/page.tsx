import { H1, Main, RedirectPlus, HeaderBetween, ShyScrollbar } from '@/components/utils'
import { getStudents } from '@/services/supabase/actions'

export default async function StudentsPage () {
  const students = await getStudents()

  return (
    <Main>

      <HeaderBetween>
        <H1
          className='mb-0'
        >
          Estudiantes
        </H1>

        <RedirectPlus href='/admin/students/new' />
      </HeaderBetween>

      <ul
        className='flex-1 overflow-y-auto'
        style={ShyScrollbar}
      >
        {students.map(student => (
          <li key={student.id}>
            {student.first_name}
          </li>
        ))}
      </ul>

    </Main>
  )
}
