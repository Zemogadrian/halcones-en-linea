'use client'
import { H1, H2 } from '@/components/utils'
import { OptionsSection } from './components/options-section'
import { v4 } from '@/utils/uuid'
import Link from 'next/link'

export default function CreateWork ({ params, searchParams }) {
  const files = searchParams?.activitydocumentation && searchParams.activitydocumentation !== ''
    ? JSON.parse(searchParams.activitydocumentation)
    : []

  console.log(files)
  return (
    <div className='flex flex-col h-full w-full gap-20'>
      <div className='border-b-2 border-b-black px-10 py-5'>
        <H1 className='text-white'>Asigna trabajo o actividad</H1>
        <H2 className='text-white'>Sigue las instrucciones en cada apartado para completar y asignar la actividad a tus alumnos correctamente</H2>
      </div>
      <div className='text-center text-white font-bold text-2xl  flex flex-col gap-2'>
        <h1 className='text-white font-bold text-xl'>
          {searchParams?.activityname}
        </h1>
        <h2 className='text-[#c4ccd3] font-bold text-xl'>
          {searchParams?.activitydescription}
        </h2>
        <h2 className='text-[#c4ccd3] font-bold text-xl'>
          {files?.map(file => (
            <Link href={file?.url} target='_blank' key={v4()} className='text-[#c4ccd3] font-bold text-xl'>{file?.name}</Link>
          ))}
        </h2>
        <h2 className='text-[#c4ccd3] font-bold text-xl'>
          {searchParams?.activitydeadline}
        </h2>
      </div>
      <OptionsSection />
    </div>
  )
}
