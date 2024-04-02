import { getUser } from '@/services/supabase/actions/auth'

export default async function LiveClassPage () {
  const account = await getUser()

  console.log(account)

  return (
    <div>
      <h1>Live Class Page</h1>
    </div>
  )
}
