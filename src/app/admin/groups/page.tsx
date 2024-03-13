import { H1, Main } from '@/components/utils'
import { getReducedCareers } from '@/services/supabase/actions'
import { SelectCareers } from './components/select-career'

export default async function GroupsPage () {
  const careers = await getReducedCareers()

  return (
    <Main>
      <header className='flex justify-between mb-10'>
        <H1 className='text-white'>Grupos</H1>
        <SelectCareers careers={careers} />
      </header>
    </Main>
  )
}
