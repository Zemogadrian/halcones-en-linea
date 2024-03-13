import { H1, Main } from '@/components/utils'
import { getGroups } from '@/services/supabase/actions'

export default async function GroupsPage () {
  const groups = await getGroups()

  console.log(groups)

  return (
    <Main>
      <H1 className='text-white'>Grupos</H1>
    </Main>
  )
}
