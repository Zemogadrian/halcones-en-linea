'use client'

import { useState } from 'react'
import { createActivityStore } from '@/stores/create-activity'
import { AnimateContainer } from './animate-container'

export const SliderBox = () => {
  const [currentPosition, setCurrentPosition] = useState(0)
  const { name, setName, setType, type, setSection } = createActivityStore(state => ({
    setName: state.setName,
    name: state.config.name,
    setType: state.setType,
    type: state.config.type,
    setSection: state.setSection
  }))

  const handleSlidePosition = (direction: '+' | '-') => {
    const newPosition = direction === '+'
      ? currentPosition + 1
      : currentPosition - 1

    const sections = {
      0: 'activity-type',
      1: 'activity-name',
      2: type === 'work' ? 'activity-work' : 'activity-questions'
    }

    setSection(sections[newPosition])

    setCurrentPosition(newPosition)
  }

  return (
    <section className='flex justify-center items-center flex-1 gap-5 overflow-hidden'>
      <button
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

        <AnimateContainer currentPosition={currentPosition} position={0}>
          <div className='flex flex-col w-full gap-2 h-full justify-center items-center'>
            <Button
              onClick={() => {
                setType('trivia')
                handleSlidePosition('+')
              }}
            >
              Trivia
            </Button>
            <Button
              onClick={() => {
                setType('exam')
                handleSlidePosition('+')
              }}
            >
              Examen
            </Button>
            <Button
              onClick={() => {
                setType('questionary')
                handleSlidePosition('+')
              }}
            >
              Cuestionario
            </Button>
            <Button
              onClick={() => {
                setType('work')
                handleSlidePosition('+')
              }}
            >
              Trabajo
            </Button>
          </div>
        </AnimateContainer>

        <AnimateContainer currentPosition={currentPosition} position={1}>
          <input
            className='text-center w-full h-full bg-transparent border rounded-md text-white'
            placeholder='Escribe el nombre de la trivia'
            value={name}
            onChange={e => setName(e.target.value)}
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
              <AnimateContainer
                currentPosition={currentPosition}
                position={2}
              >
                Cualquier otro tipo
              </AnimateContainer>
              )
        }
      </div>
      <button
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

const Button = ({ children, ...props }: React.HTMLAttributes<HTMLButtonElement>) => (
  <button
    className='bg-itesus-tertiary w-full rounded-md text-left px-5 font-bold text-lg'
    {...props}
  >
    {children}
  </button>
)
