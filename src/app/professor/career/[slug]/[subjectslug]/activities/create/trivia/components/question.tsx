'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Answer } from './answer'
import { useState } from 'react'

export const CreateQuestion = () => {
  const { replace } = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const defaultValueQ = params.get('triviaquestion') ?? ''
  //   const defaultValueA = params.get('triviaanswer') ?? ''

  const handleOnChangeQuestion = (e) => {
    const queryParams = new URLSearchParams(params)
    queryParams.set('triviaquestion', e.target.value)
    const URL = `${pathname}?${queryParams.toString()}`
    replace(URL)
  }
  //   const handleOnChangeAnswer = (e) => {
  //     const queryParams = new URLSearchParams(params)
  //     queryParams.set('triviaanswer', e.target.value)
  //     const URL = `${pathname}?${queryParams.toString()}`
  //     replace(URL)
  //   }

  const [answers, setAnswers] = useState([''])

  const handleAddAnswer = () => {
    setAnswers(prevAnswers => [...prevAnswers, ''])
  }

  const handleOnChangeAnswer = (index) => (newAnswer) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers]
      newAnswers[index] = newAnswer
      return newAnswers
    })
  }

  return (
    <div className='flex flex-col justify-center items-center gap-3'>
      <input defaultValue={defaultValueQ} type='text' onChange={handleOnChangeQuestion} placeholder='Escribe tu pregunta' required className='placeholder-[#1f1f3d] font-bold text-lg p-2 rounded-xl w-full' />
      <div className='flex flex-row items-center justify-center gap-5'>
        <label className='text-center items-center flex gap-2  p-2 rounded-xl bg-[#ccccca]'>
          <span className='text-[#1f1f3d] text-lg font-bold'> Abierta </span>
          <input type='radio' placeholder='Abierta' required className='underline-offset-auto text-white bg-transparent border-2 w-5 h-5 text-center font-bold border-slate-500' />
        </label>
        <label className='text-center items-center flex gap-2  p-2 rounded-xl bg-[#ccccca]'>
          <span className='text-[#1f1f3d] text-lg font-bold'> Múltiple </span>
          <input type='radio' placeholder='Escribe tu respuesta' required className='underline-offset-auto text-white bg-transparent border-2 w-5 h-5 text-center font-bold border-slate-500' />
        </label>
        <label className='text-center items-center flex gap-2  p-2 rounded-xl bg-[#ccccca]'>
          <span className='text-[#1f1f3d] text-lg font-bold'> Permitir archivo </span>
          <input type='checkbox' placeholder='Escribe tu respuesta' required className='underline-offset-auto text-white bg-transparent border-2 w-5 h-5 text-center font-bold border-slate-500' />
        </label>
      </div>
      <div className='flex flex-col gap-2'>
        {answers.map((answer, index) => (
          <Answer
            key={index}
            value={answer}
            onChange={handleOnChangeAnswer(index)}
          />
        ))}
        <button onClick={handleAddAnswer} className='bg-[#1a639f] px-2 rounded-lg text-white font-normal'>+</button>
      </div>
    </div>
  )
}
