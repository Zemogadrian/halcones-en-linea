import { TableContainer, Table, THeadSticky, Th, Tr, Td } from '@/components/utils'
import { getGroupsByCareer } from '@/services/supabase/actions/groups'
import { dateFormatter } from '@/utils/formatters'
import { v4 } from '@/utils/uuid'
import { IconEdit } from '@tabler/icons-react'
import Link from 'next/link'

interface Props {
  careerId: number
}

export async function TableGroups ({ careerId }: Props) {
  const groups = await getGroupsByCareer(careerId)

  return (
    <TableContainer>
      <Table>
        <THeadSticky>
          <tr>
            <Th>Grupo</Th>
            <Th>Fecha de creacion</Th>
            <Th>Acciones</Th>
          </tr>
        </THeadSticky>

        <tbody>
          {groups.map(group => (
            <Tr key={v4()}>
              <Td>{group.name}</Td>
              <Td>{dateFormatter(new Date(group.created_at), 'es-MX')}</Td>
              <Td className='py-1'>
                <div className='flex justify-center items-center'>
                  <Link
                    href={`/admin/groups/edit/${group.id}`}
                    className='p-1 bg-itesus-primary rounded-md cursor-pointer hover:bg-itesus-secondary transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-itesus-secondary focus:border-transparent'
                  >
                    <IconEdit
                      size={20}
                    />
                  </Link>
                </div>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  )
}
