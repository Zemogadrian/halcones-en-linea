'use client'

import { createActivity } from '@/services/supabase/actions/professors'
import { useFileStore, useQuestionsStore } from '@/stores/create-activity'
import { z } from 'zod'

interface Props {
  searchParams: {
    [key: string]: string
  }
}

const ActivityTypeEnum = z.enum(['trivia', 'exam', 'questionary', 'work'])

export const AssignActivityButton = ({ searchParams }: Props) => {
  const files = useFileStore(state => state.files)
  const questions = useQuestionsStore(state => state.questions)

  return (
    <button
      onClick={() => {
        (async () => {
          const type = ActivityTypeEnum.parse(searchParams.type)

          const base64FilesArray = await Promise.all(files.map(async (file) => {
            const arrayBuffer = await file.arrayBuffer()
            const base64 = Buffer.from(arrayBuffer).toString('base64')
            return {
              bytes: base64,
              name: file.name
            }
          }))

          await createActivity({
            config: {
              career: Number(searchParams.careerId),
              deadline: searchParams.deadline ?? new Date().toISOString().slice(0, 19),
              desc: searchParams.desc,
              education_plan: Number(searchParams.educationPlanId),
              name: searchParams.name,
              group: Number(searchParams.groupId),
              semester: Number(searchParams.semesterId),
              subject: Number(searchParams.subjectId),
              type,
              is_open: true
            },
            files: type === 'work' ? base64FilesArray : null,
            questions: type === 'work' ? null : Object.values(questions).filter(q => q.question !== '' && q.responses != null && q.responses.length > 0)
          })
        })().catch(err => console.log(err))
      }}
      className='bg-itesus-primary px-2 rounded-lg text-white'
    >
      Asignar actividad
    </button>
  )
}
