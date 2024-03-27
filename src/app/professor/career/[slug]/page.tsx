import { Main } from '@/components/utils'
import { getMyClasses } from '@/services/supabase/actions/professors'

interface Props {
  params: {
    slug: string
  }
}

export default async function CareerPage ({ params }: Props) {
  console.log(params)

  const classes = await getMyClasses(params.slug)

  console.log(classes)

  return (
    <Main>
      a
    </Main>
  )
}
