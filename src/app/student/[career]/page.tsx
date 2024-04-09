import { H1, H2, H4, Main, ShyScrollbar } from '@/components/utils'
import { getUser } from '@/services/supabase/actions/auth'
import { getMySubjects } from '@/services/supabase/actions/students'
import { v4 } from '@/utils/uuid'
import Link from 'next/link'

interface Props {
  params: {
    career: string
  }
  searchParams: {
    [key: string]: string
  }
}

export default async function StudentCareerPage ({ params, searchParams }: Props) {
  const account = await getUser()
  const mySubjects = await getMySubjects(decodeURIComponent(params.career))
    .catch((error) => {
      console.log('Error getting subjects', error)
    })

  return (
    <Main>
      <header
        className='mb-4'
      >
        <H1 className='text-white'>Hola, {account?.first_name} {account?.last_name}</H1>
      </header>

      <section className='text-white '>
        <H2 className='mb-2'>
          Materias:
        </H2>

        <ul
          style={ShyScrollbar}
          className='flex gap-2 flex-nowrap overflow-x-auto'
        >
          {mySubjects?.subjects.map((subject) => {
            const newSearchParams = new URLSearchParams(searchParams)
            const searchParamsToAdd = {
              subjectId: subject.id.toString() ?? '',
              semesterId: mySubjects.semester?.id.toString() ?? '',
              groupId: mySubjects.group?.id.toString() ?? '',
              educationPlan: mySubjects.educationPlan?.id.toString() ?? ''
            }

            Object.entries(searchParamsToAdd).forEach(([key, value]) => {
              newSearchParams.set(key, value)
            })

            return (
              <Link
                key={v4()}
                href={`/student/${params.career}/subject/${subject.slug}/topics?${newSearchParams.toString()}`}
                className='bg-itesus-tertiary px-4 py-2 rounded-md hover:bg-itesus-primary transition-colors duration-300 ease-in-out'
              >
                <H4
                  className='text-black'
                >
                  {subject.name}
                </H4>
              </Link>
            )
          })}
        </ul>
      </section>
    </Main>
  )
}
