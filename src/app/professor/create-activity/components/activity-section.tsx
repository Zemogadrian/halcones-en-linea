'use client'
import { H1, H2 } from '@/components/utils'
import { useQuestionsStore } from '@/stores/create-activity'
import { v4 } from '@/utils/uuid'
import { useSearchParams } from 'next/navigation'

export function ActivitySection () {
  const searchParams = useSearchParams()
  const questions = useQuestionsStore(state => state.questions)

  const { section, name, questionIndex = '0' } = Object.fromEntries(searchParams)

  return (
    <section className='text-itesus-tertiary flex flex-col items-center w-full h-[20%]'>
      {section === 'activity-name' && (
        <H1>
          {name}
        </H1>
      )}

      {section === 'questions' && (
        <>
          <H2>{questions[questionIndex]?.question}</H2>

          <ul
            className='list-upper-alpha'
          >
            {questions[questionIndex]?.responses?.map((response) => (
              <li
                key={v4()}
              >
                <span
                  className={`${response.is_correct === true ? 'text-green-400' : ''}`}
                >{response.option}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
