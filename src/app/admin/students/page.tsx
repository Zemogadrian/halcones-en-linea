import { H1, Main, RedirectPlus, HeaderBetween, TableContainer, Table, THeadSticky, Th, Tr, Td } from '@/components/utils'
import { getStudents } from '@/services/supabase/actions'
import { v4 } from '@/utils/uuid'
import { IconEdit } from '@tabler/icons-react'
import Link from 'next/link'

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

          <tbody>
            {students.map((student) => (
              <Tr
                key={v4()}
              >
                <Td
                  className='capitalize'
                >
                  {student.first_name} {student.last_name}
                </Td>
                <Td>{student.email}</Td>
                <Td>{student.phone}</Td>
                <Td>
                  <div className='flex justify-center items-center'>
                    <Link
                      href={`/admin/students/edit/${student.id}`}
                      className='p-1 bg-itesus-primary rounded-md cursor-pointer hover:bg-itesus-secondary transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-itesus-secondary focus:border-transparent'
                    >
                      <IconEdit
                        size={20}
                        strokeWidth={1.5}
                        color='#fff'
                      />
                    </Link>
                  </div>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

    </Main>
  )
}
