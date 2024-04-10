'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Answer } from './answer'
import { useState } from 'react'

export const CreateQuestion = () => {
  const { replace } = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null)
  const defaultValueQ = params.get('triviaquestion') ?? ''
  const [questionType, setQuestionType] = useState<string>('')

  console.log(questionType)
  const handleOnChangeQuestion = (e) => {
    const queryParams = new URLSearchParams(params)
    queryParams.set('triviaquestion', e.target.value)
    const URL = `${pathname}?${queryParams.toString()}`
    replace(URL)
  }

  const handleQuestionTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionType(event.target.value)
  }
  const [answers, setAnswers] = useState([''])

  const handleAddAnswer = () => {
    setAnswers(prevAnswers => [...prevAnswers, ''])
  }
  const handleCorrectAnswer = (answer: string) => {
    const queryParams = new URLSearchParams(params)
    setCorrectAnswer(answer)
    queryParams.set('correctAnswer', answer)
    const URL = `${pathname}?${queryParams.toString()}`
    replace(URL)
    console.log(correctAnswer)
  }
  const handleOnChangeAnswer = (index) => (newAnswer) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers]
      newAnswers[index] = newAnswer
      return newAnswers
    })
  }

  return (
    <div className='flex flex-col  gap-3 h-full'>
      <input defaultValue={defaultValueQ} type='text' onChange={handleOnChangeQuestion} placeholder='Escribe tu pregunta' required className='placeholder-[#1f1f3d] font-bold text-lg text-black p-2 rounded-xl w-full' />
      <div className='flex flex-row gap-5'>
        <label className='text-center items-center flex gap-2  p-2 rounded-xl bg-[#ccccca]'>
          <span className='text-[#1f1f3d] text-lg font-bold'> Abierta </span>
          <input type='radio' name='questionType' value='Abierta' onChange={handleQuestionTypeChange} required className='underline-offset-auto text-white bg-transparent border-2 w-5 h-5 text-center font-bold border-slate-500' />
        </label>
        <label className='text-center items-center flex gap-2  p-2 rounded-xl bg-[#ccccca]'>
          <span className='text-[#1f1f3d] text-lg font-bold'> Múltiple </span>
          <input type='radio' name='questionType' value='Múltiple' onChange={handleQuestionTypeChange} required className='underline-offset-auto text-white bg-transparent border-2 w-5 h-5 text-center font-bold border-slate-500' />
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
            onCorrectAnswer={handleCorrectAnswer}
            className=''
          />
        ))}
        <button onClick={handleAddAnswer} className='bg-[#1a639f] px-2 rounded-lg text-white font-normal'>+</button>
      </div>
    </div>
  )
}
