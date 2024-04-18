'use client'
import { H2, H3, ShyScrollbar } from '@/components/utils'
import { useFileStore, useQuestionsStore } from '@/stores/create-activity'
import { v4 } from '@/utils/uuid'
import { IconFileSpreadsheet, IconFileText, IconFileTypePdf, IconTrash } from '@tabler/icons-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export function ActivitySection () {
  const searchParams = useSearchParams()
  const questions = useQuestionsStore(state => state.questions)
  const files = useFileStore(state => state.files)
  const deleteFile = useFileStore(state => state.removeFile)
  const { section, name, questionIndex = '0', desc } = Object.fromEntries(searchParams)

  return (
    <section
      style={ShyScrollbar}
      className='text-itesus-tertiary flex flex-col items-center w-full h-[25%] overflow-y-auto'
    >
      {['activity-name', 'desc', 'file'].includes(section) && (
        <div className='w-full max-w-2xl'>
          <H3>
            {name}
          </H3>
          <p>
            {desc}
          </p>

          <ul className='list-decimal'>
            {files.map((file) => {
              const url = URL.createObjectURL(file)
              const type = file.type

              return (
                <li key={v4()}>
                  <figure>
                    <div className='flex gap-3'>
                      <Link
                        target='_blank'
                        href={url}
                        className='flex gap-1 items-center'
                      >
                        {type.endsWith('sheet') && (
                          <IconFileSpreadsheet
                            size={20}
                          />
                        )}

                        {type.endsWith('pdf') && (
                          <IconFileTypePdf
                            size={20}
                          />
                        )}

                        {type.endsWith('document') && (
                          <IconFileText
                            size={20}
                          />
                        )}

                        {file.name}
                      </Link>
                      <button onClick={
                      () => deleteFile(files.indexOf(file))
                    }
                      >
                        <IconTrash
                          size={20}
                        />
                      </button>
                    </div>

                    {type.startsWith('image') && (
                      <img
                        src={url}
                        alt={file.name}
                        className='w-10'
                      />
                    )}
                  </figure>

                </li>
              )
            })}
          </ul>
        </div>
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
