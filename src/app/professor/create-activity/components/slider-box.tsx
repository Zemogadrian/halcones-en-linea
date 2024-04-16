'use client'

import { useRef, useState } from 'react'
import { createActivityStore } from '@/stores/create-activity'
import { AnimateContainer } from './animate-container'
import { SelectorType } from './selector-type'
import { DisplayQuestion } from './display-question'
import { v4 } from '@/utils/uuid'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const SliderBox = () => {
  const [currentPosition, setCurrentPosition] = useState(0)
  const $form = useRef<HTMLFormElement>(null)
  const { name, setName, setType, type, setSection, questions, setQuestionsQuantity } = createActivityStore(state => ({
    setName: state.setName,
    name: state.config.name,
    setType: state.setType,
    type: state.config.type,
    setSection: state.setSection,
    questions: state.questions,
    setQuestionsQuantity: state.setQuestionsQuantity
  }))
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handleSlidePosition = (direction: '+' | '-') => {
    setCurrentPosition(prev => {
      const newPosition = direction === '+'
        ? prev + 1
        : prev - 1

      const sections = {
        0: 'activity-type',
        1: 'activity-name',
        2: type === 'work' ? 'activity-work' : `activity-questions-${newPosition - 2}`
      }

      setSection(sections[newPosition])

      if ($form.current != null) {
        const data = new FormData($form.current)

        if (prev === 1) {
          const name = data.get('activity-name')?.toString() ?? ''

          setName(name)
        }

        if (prev === 2 && type !== 'work') {
          const questionsAmount = Number(data.get('questions-amount')?.toString() ?? '0')

          console.log('questionsAmount', questionsAmount)

          setQuestionsQuantity(questionsAmount)
        }
      }

      return newPosition
    })
  }

  return (
    <section className='flex justify-center items-center flex-1 gap-5 overflow-hidden'>
      <button
        disabled={currentPosition === 0}
        className='bg-[#cdcccb] p-3 rounded-lg'
        onClick={() => {
          handleSlidePosition('-')
        }}
      >
        Izquierda
      </button>
      <form
        ref={$form}
        className='h-72 aspect-[16/9] relative'
      >

        <AnimateContainer currentPosition={currentPosition} position={0}>
          <SelectorType
            onSelect={(type) => {
              setType(type)
              handleSlidePosition('+')
            }}
          />
        </AnimateContainer>

        <AnimateContainer currentPosition={currentPosition} position={1}>
          <input
            className='text-center w-full h-full bg-transparent border rounded-md text-white'
            placeholder='Escribe el nombre de la trivia'
            defaultValue={name}
            onChange={(e) => {
              const newSearchParams = new URLSearchParams(searchParams)

              newSearchParams.set('activity-name', e.target.value)

              router.replace(
                `${pathname}?${newSearchParams.toString()}`
              )
            }}
            name='activity-name'
          />
        </AnimateContainer>

        {
          type === 'work'
            ? (
              <AnimateContainer
                currentPosition={currentPosition}
                position={2}
              >
                Trabajo
              </AnimateContainer>
              )
            : (
              <>
                <AnimateContainer
                  currentPosition={currentPosition}
                  position={2}
                >
                  <label
                    className='flex items-center bg-itesus-tertiary p-2 rounded-md text-itesus-secondary font-semibold text-lg px-2 gap-2 outline-none placeholder:text-itesus-secondary/80'
                  >
                    <span
                      className='flex-1'
                    >
                      Cantidad de preguntas:
                    </span>

                    <input
                      className='w-min px-2 bg-transparent border-b-2 border-itesus-secondary outline-none' type='number'
                      defaultValue={questions?.length}
                      name='questions-amount'
                    />
                  </label>
                </AnimateContainer>

                {questions?.map((question, i) => (
                  <AnimateContainer
                    key={v4()}
                    currentPosition={currentPosition}
                    position={i + 3}
                  >
                    <DisplayQuestion
                      defaultValue={{
                        index: i,
                        question
                      }}
                    />
                  </AnimateContainer>
                ))}
              </>
              )
        }
      </form>
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
