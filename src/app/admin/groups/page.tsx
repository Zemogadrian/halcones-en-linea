import { H1, Main } from '@/components/utils'
import { getReducedCareers } from '@/services/supabase/actions'
import { SelectCareers } from './components/select-career'
import { TableGroups } from './components/table-groups'
import { Suspense } from 'react'

interface Props {
  searchParams: {
    career?: string
  }
}

export default async function GroupsPage ({ searchParams }: Props) {
  const careers = await getReducedCareers()

  return (
    <Main>
      <header className='flex justify-between mb-10'>
        <H1 className='text-white'>Grupos</H1>
        <SelectCareers careers={careers} />
      </header>

      <Suspense fallback={<div>loading</div>}>
        <TableGroups careerId={parseInt(searchParams.career ?? '0')} />
      </Suspense>
    </Main>
  )
}
