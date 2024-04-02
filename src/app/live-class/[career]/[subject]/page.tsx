import { getUser } from '@/services/supabase/actions/auth'

interface Props {
  params: {
    career: string
    subject: string
  }
}

export default async function LiveClassPage ({ params, searchParams }: Props) {
  const account = await getUser()

  console.log(params, searchParams)

  return (
    <div>
      <h1>Live Class Page</h1>
    </div>
  )
}
