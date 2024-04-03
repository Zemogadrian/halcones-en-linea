import { getUser } from '@/services/supabase/actions/auth'
import { Meet } from './components/meet'

interface Props {
  params: {
    career: string
    subject: string
  }
  searchParams: {
    groupId: string
    semesterId: string
    educationPlanId: string
  }
}

export default async function LiveClassPage ({ params, searchParams }: Props) {
  const account = await getUser()

  const code = `${params.career}-${params.subject}-${searchParams.groupId}-${searchParams.semesterId}-${searchParams.educationPlanId}`

  return (
    <Meet
      appName={decodeURIComponent(params.career)}
      code={code}
      account={{
        email: account?.email ?? '',
        first_name: `${account?.first_name ?? ''} ${account?.last_name ?? ''}`
      }}
    />
  )
}
