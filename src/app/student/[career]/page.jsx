import { H1, Main } from '@/components/utils'
import { getUser } from '@/services/supabase/actions/auth'

export default async function StudentPage () {
  const account = await getUser()

  return (
    <Main>
      <header>
        <H1 className='text-white'>Hola, {account.first_name} {account.last_name}</H1>
      </header>
    </Main>
  )
}
