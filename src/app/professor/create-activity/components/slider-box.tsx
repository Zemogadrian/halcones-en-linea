'use client'

import { AnimateContainer } from './animate-container'
import { AnimateQuesionConatiner } from './animate-question-container'
import { SelectorType } from './selector-type'
import { DisplayQuestion } from './display-question'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const sections = {
  0: () => 'activity-type',
  1: () => 'activity-name',
  2: (type: string) => type === 'work' ? 'desc' : 'questions',
  3: (type: string) => type === 'work' ? 'file' : 'questions'
}

const names = {
  trivia: 'trivia',
  exam: 'examen',
  questionary: 'cuestionario',
  work: 'actividad'
}

export const SliderBox = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { type, name = '', questionIndex = '0', currentPosition = '0', lastQuestionIndex = '0', section, desc } = Object.fromEntries(searchParams) as {
    type: 'trivia' | 'exam' | 'questionary' | 'work'
    name: string
    questionIndex: string
    currentPosition: string
    lastQuestionIndex: string
    section: string
    desc: string
  }

  const setQuerys = (querys: { [key: string]: string }) => {
    const newSearchParams = new URLSearchParams(searchParams)

    const newQuerys = {
      ...querys,
      section: sections[Number(querys.currentPosition)]?.(type) ?? section
    }

    Object.entries(newQuerys).forEach(([key, value]) => {
      value === ''
        ? newSearchParams.delete(key)
        : newSearchParams.set(key, value)
    })

    router.replace(
      `${pathname}?${newSearchParams.toString()}`
    )
  }

  const setQueryParams = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams)

    value === ''
      ? newSearchParams.delete(key)
      : newSearchParams.set(key, value)

    router.replace(
      `${pathname}?${newSearchParams.toString()}`
    )
  }

  const setCurrentPosition = (cb: (prev: number) => number, querys?: { [key: string]: string }) => {
    const newPosition = cb(Number(currentPosition)).toString()

    const newQuerys = {
      ...querys,
      currentPosition: newPosition
    }

    setQuerys(newQuerys)
  }

  const setQuestionIndex = (cb: (prev: number) => number) => {
    const newIndex = cb(Number(questionIndex)).toString()

    setQuerys({
      questionIndex: newIndex,
      lastQuestionIndex: questionIndex
    })
  }

  const handleSlidePosition = (direction: '+' | '-', setQuerys?: { [key: string]: string }) => {
    const subProccess = () => {
      setCurrentPosition(prev => {
        const newPosition = direction === '+'
          ? prev + 1
          : prev - 1

        return newPosition
      }, {
        ...setQuerys,
        lastQuestionIndex: '0'
      })
    }

    if (Number(currentPosition) >= 2 && type !== 'work') {
      Number(questionIndex) === 0 && direction === '-'
        ? subProccess()
        : setQuestionIndex(prev => {
          const newIndex = direction === '+'
            ? prev + 1
            : prev - 1

          return newIndex
        })

      return
    }

    subProccess()
  }

  return (
    <section className='flex justify-center items-center flex-1 gap-5 overflow-hidden'>
      <button
        disabled={Number(currentPosition) === 0}
        className='bg-[#cdcccb] p-3 rounded-lg'
        onClick={() => {
          handleSlidePosition('-')
        }}
      >
        Izquierda
      </button>
      <div
        className='h-72 aspect-[16/9] relative'
      >
        <AnimateContainer currentPosition={Number(currentPosition)} position={0}>
          <SelectorType
            onSelect={(type) => {
              handleSlidePosition('+', {
                type
              })
            }}
          />
        </AnimateContainer>

        <AnimateContainer currentPosition={Number(currentPosition)} position={1}>
          <input
            className='text-center w-full h-full bg-transparent border rounded-md text-white'
            placeholder={`Escribe el nombre de tu ${names[type]}`}
            defaultValue={name}
            onChange={(e) => {
              setQueryParams('name', e.target.value)
            }}
          />
        </AnimateContainer>

        {
          type === 'work'
            ? (
              <>
                <AnimateContainer
                  currentPosition={Number(currentPosition)}
                  position={2}
                >
                  <input
                    className='text-center w-full h-full bg-transparent border rounded-md text-white'
                    placeholder='Describe tu actividad'
                    defaultValue={desc}
                    onChange={(e) => {
                      setQueryParams('desc', e.target.value)
                    }}
                  />
                </AnimateContainer>
                <AnimateContainer
                  currentPosition={Number(currentPosition)}
                  position={3}
                >
                  <div
                    className='w-full relative h-full flex justify-center items-center bg-transparent border rounded-md text-center'
                  >

                    <p
                      className='text-itesus-tertiary/20 italic leading-none'
                    >
                      <span className='border-b border-itesus-tertiary/20'>Arrastra tu documentación requerida para la actividad</span><br />
                      <span className='border-b border-itesus-tertiary/20'>Ej: Archivo .pdf | .doc | .jpg | .ppt | .xls</span>
                    </p>

                    <input
                      className=' w-full h-full absolute inset-0 opacity-0 '
                      type='file'
                      multiple
                      draggable
                      onDrag={e => {
                        console.log(e)
                      }}
                      onChange={e => {
                        console.log(e)
                      }}
                    />
                  </div>
                </AnimateContainer>
              </>
              )
            : (
              <>
                {Number(currentPosition) === 2 && (
                  <AnimateQuesionConatiner
                    index={Number(questionIndex)}
                    lastIndex={Number(lastQuestionIndex)}
                  >
                    <DisplayQuestion
                      index={Number(questionIndex)}
                    />
                  </AnimateQuesionConatiner>
                )}
              </>
              )
        }
      </div>
      <button
        disabled={type == null}
        className='bg-[#cdcccb] p-3 rounded-lg'
        onClick={() => {
          handleSlidePosition('+')
        }}
      >
        Derecha
      </button>
    </section>
  )
}
