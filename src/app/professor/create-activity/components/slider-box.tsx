'use client'

import { useState } from 'react'
import { InteractiveBox } from './box'
import { createActivityStore } from '@/stores/create-activity'

export const SliderBox = () => {
  const [currentPosition, setCurrentPosition] = useState(0)
  const { name, setName } = createActivityStore(state => ({
    setName: state.setName,
    name: state.config.name
  }))

  const handleSlidePosition = (direction: '+' | '-') => {
    direction === '+'
      ? setCurrentPosition(prev => prev + 1)
      : setCurrentPosition(prev => prev - 1)
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
        <InteractiveBox
          currentPosition={currentPosition}
          position={0}
          options={[
            {
              type: 'input',
              placeholder: 'Nombre de la actividad',
              onChange ({ event }) {
                setName(event.target.value)
              },
              value: name
            }
          ]}
        />
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
