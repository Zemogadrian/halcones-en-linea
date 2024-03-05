'use client'

import { MultiDragAndDropWithId } from '@/components/drag-and-drog/multiple'
import { H2, LabeledInput } from '@/components/utils'
import { v4 } from '@/utils/uuid'
import { Tables } from 'database.types'
import { useState } from 'react'
import { z } from 'zod'

interface Props {
  subjects: Array<Tables<'subjects'>>
}

export const SemesterSection = ({ subjects }: Props) => {
  const [semesters, setSemesters] = useState(1)

  return (
    <>
      <LabeledInput
        label='Cantidad de semestres'
        name='semesters'
        type='number'
        required
        defaultValue={1}
        onChange={(event) => {
          const { success, data } = z.number().safeParse(Number(event.target.value)) as { success: boolean, data: number }

          if (!success) return

          if (data > 15) {
            event.target.value = '15'
            setSemesters(15)
            return
          }

          setSemesters(data)
        }}
      />

      <section className='grid grid-cols-3 gap-3 mt-3'>
        {Array.from({ length: semesters }).map((_, index) => (
          <article key={v4()}>
            <H2>Semestre {index + 1}</H2>

            <MultiDragAndDropWithId
              options={subjects.map((subject) => subject.name)}
            />
          </article>
        ))}

      </section>
    </>
  )
}
