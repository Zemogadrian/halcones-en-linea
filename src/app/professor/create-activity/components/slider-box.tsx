'use client'

import { AnimateContainer } from './animate-container'
import { AnimateQuesionConatiner } from './animate-question-container'
import { SelectorType } from './selector-type'
import { DisplayQuestion } from './display-question'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const SliderBox = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { type, name = '', questionIndex = '0', currentPosition = '0', lastQuestionIndex = '0' } = Object.fromEntries(searchParams)

  const setQuerys = (querys: { [key: string]: string }) => {
    const newSearchParams = new URLSearchParams(searchParams)

    Object.entries(querys).forEach(([key, value]) => {
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

    if (Number(currentPosition) >= 2) {
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
            placeholder='Escribe el nombre de la trivia'
            defaultValue={name}
            onChange={(e) => {
              setQueryParams('name', e.target.value)
            }}
          />
        </AnimateContainer>

        {
          type === 'work'
            ? (
              <AnimateContainer
                currentPosition={Number(currentPosition)}
                position={2}
              >
                Trabajo
              </AnimateContainer>
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
