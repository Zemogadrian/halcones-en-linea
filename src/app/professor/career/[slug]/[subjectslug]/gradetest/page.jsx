import { getActivityById, getMyStudents } from '@/services/supabase/actions/professors'
import { ShowAlumns } from '../gradeactivity/show-alumns'
// import { H1 } from '@/components/utils'

export default async function GradeTest ({ params, searchParams }) {
  console.log(params, searchParams)

  const activity = await getActivityById(searchParams?.activityId)

  const myStudents = await getMyStudents({
    careerId: searchParams?.careerId,
    educationPlanId: searchParams?.educationPlanId,
    groupId: searchParams?.groupId,
    semesterId: searchParams?.semesterId
  })

  console.log(activity, myStudents)

  return (
    <main className='flex flex-col gap-5 w-full h-full '>
      <ShowAlumns students={myStudents} />
      <span className='underline text-xl font-black text-[#cfd0d2] text-start'>{activity.name}</span>
      <section className='flex flex-row gap-10'>
        <div className='flex flex-col w-full'>
          {activity.questions.map(question => (
            <section key={question.id} className='flex flex-col gap-2'>
              <h1 className='text-white underline'>{question.question}</h1>
              {question.responses.map(response => (
                <div key={response.id} className='flex flex-row gap-2 '>
                  {/* <span className= `text-[${question.is_correct === 'true' ? text-[#5b9a97] : text-white }]`>{response.option}</span> */}
                </div>
              ))}
            </section>
          ))}
        </div>
        <div className='flex flex-col w-1/4  gap-2 border'>
          <span className='underline text-xl font-black text-[#cfd0d2] px-5 text-center'>{activity.type}</span>
          <section className='flex flex-col p-5'>
            <input type='text' className='p-2 text-[#cfd0d2] border bg-transparent' placeholder='Calificación' />
            <input type='text' className='p-2 text-[#cfd0d2] border bg-transparent' placeholder='Comentario' />
            <button className='rounded-md bg-[#1664a6] text-white w-24 self-center mt-10'>
              Enviar
            </button>
          </section>
        </div>
      </section>
    </main>
  )
}
