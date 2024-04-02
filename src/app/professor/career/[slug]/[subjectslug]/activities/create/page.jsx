'use client'
import { H1, H2 } from '@/components/utils'
import { options } from './components/options'
import Link from 'next/link'

export default function CreateActivities ({ params, searchParams }) {
  console.log(options)
  const newSearchParams = new URLSearchParams(searchParams)
  console.log(searchParams)
  return (
    <div className='flex flex-col h-full w-full gap-40'>
      <div className='border-b-2 border-b-black px-10 py-5'>
        <H1 className='text-white underline'>Crea tu actividad</H1>
        <H2 className='text-white'>Selecciona la actividad a crear para tus alumnos</H2>
      </div>
      {/* <button>
          <img src='/arrow.svg' alt='' className='w-14 h-14 rotate-90' />
        </button> */}
      <div className='flex flex-col gap-5 items-center justify-center'>
        {options.map((option, index) => (
          <Link
            href={`/professor/career/${params.slug}/${params.subjectslug ?? ''}/activities/create/${option.component}?${newSearchParams.toString()}`}
            key={index}
            className='h-14 w-[40rem] bg-[#cecbcb] rounded-xl underline px-5 text-xl font-bold flex items-center'
          >
            {option.title}
          </Link>

        ))}
      </div>

    </div>
  )
}
