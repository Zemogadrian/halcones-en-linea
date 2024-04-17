'use client'

import { useQuestionsStore } from '@/stores/create-activity'
import { useEffect, useState } from 'react'

interface Props {
  index: number
}

export const DisplayQuestion = ({ index }: Props) => {
  const setQuestion = useQuestionsStore(state => state.setQuestion)
  const getQuestion = useQuestionsStore(state => state.getQuestion)
  const [data, setData] = useState(getQuestion(index))

  useEffect(() => {
    setQuestion(index, data)
  }, [data])

  useEffect(() => {
    setData(getQuestion(index))
  }, [index])

  return (
    <div className='flex flex-col w-full h-full justify-center items-center gap-2'>
      <input
        className='bg-itesus-tertiary py-1 w-full rounded-md text-itesus-secondary font-semibold text-lg px-2 outline-none placeholder:text-itesus-secondary/80'
        placeholder='Escribe tu pregunta'
        value={data.question}
        onChange={(e) => {
          setData(prev => ({
            ...prev,
            question: e.target.value
          }))
        }}
      />

      <div className='flex w-full justify-between gap-2'>

        <ButtonInput
          type='radio'
          name='type_question'
          checked={data?.type === 'open'}
          onChange={() => {
            setData(prev => ({
              ...prev,
              type: 'open'
            }))
          }}
        >
          Abierta
        </ButtonInput>

        <ButtonInput
          type='radio'
          name='type_question'
          checked={data?.type === 'multiple_option'}
          onChange={() => {
            setData(prev => ({
              ...prev,
              type: 'multiple_option'
            }))
          }}
        >
          Cerrada
        </ButtonInput>

        <ButtonInput
          type='checkbox'
          checked={data.accept_file}
          onChange={() => {
            setData(prev => ({
              ...prev,
              accept_file: !prev.accept_file
            }))
          }}
        >
          Permitir archivo
        </ButtonInput>
      </div>

      <div className='bg-itesus-tertiary w-full flex rounded-md px-3 py-1 gap-1'>
        <input
          placeholder='Escribe tu respuesta'
          className='flex-1 bg-transparent outline-none placeholder:text-itesus-secondary/80 text-itesus-secondary font-semibold text-lg'
        />

        <button
          className='bg-itesus-primary text-itesus-tertiary font-semibold px-3 py-1 rounded-md'
        >
          Respuesta correcta
        </button>

        <button
          className='bg-itesus-primary text-itesus-tertiary font-semibold px-3 py-1 rounded-md'
        >
          +
        </button>
      </div>

      {/* <div className='bg-itesus-primary text-itesus-tertiary font-semibold px-3 py-1 rounded-md'>
        Indice de la pregunta
      </div> */}
    </div>
  )
}

interface ButtonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: 'radio' | 'checkbox'
}

const ButtonInput = ({ children, ...props }: ButtonInputProps) => (
  <label
    className='flex items-center gap-4 bg-itesus-tertiary py-1 px-5 rounded-md text-itesus-secondary font-semibold text-sm cursor-pointer justify-around leading-none flex-1'
  >
    <span className='w-min  border-itesus-secondary border-b-2'>
      {children}
    </span>
    <input
      {...props}
    />
  </label>
)
