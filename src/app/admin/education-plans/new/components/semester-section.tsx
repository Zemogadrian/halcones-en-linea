'use client'

import { MultiDragAndDrop } from '@/components/drag-and-drog/multiple'
import { H2, LabeledInput } from '@/components/utils'
import { SearchInput } from '@/components/utils/client/inputs'
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

      <div className='flex flex-1 w-full py-3'>

        <section key={v4()} className='px-3 flex flex-col py-1 rounded-md bg-itesus-secondary h-full w-96'>
          <div
            className='flex border-b mb-3 py-1 justify-between'
          >
            <H2>
              Materias
            </H2>

            <div className='h-full flex justify-center items-center'>
              <SearchInput placeholder='Matematicas' />
            </div>
          </div>

          <MultiDragAndDrop
            options={subjects.map((subject) => subject.name)}
          />
        </section>

        <section className='grid grid-cols-2 gap-3 w-full h-[27rem] overflow-y-auto px-2'>

          {Array.from({ length: semesters }).map((_, index) => (
            <article key={v4()} className='border px-3 py-1 rounded-md min-h-72 w-full'>
              <H2
                className='border-b py-1 mb-3'
              >
                Semestre {index + 1}
              </H2>

              <MultiDragAndDrop
                options={[]}
              />
            </article>
          ))}

        </section>

      </div>
    </>
  )
}
