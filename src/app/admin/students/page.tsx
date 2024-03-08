import { H1, Main, RedirectPlus, HeaderBetween, TableContainer, Table, THeadSticky, Th } from '@/components/utils'
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

      <TableContainer>
        <Table>
          <THeadSticky>
            <tr>
              <Th>Nombre</Th>
              <Th>Correo</Th>
              <Th>Telefono</Th>
              <Th>Acciones</Th>
            </tr>
          </THeadSticky>
        </Table>
      </TableContainer>

    </Main>
  )
}
