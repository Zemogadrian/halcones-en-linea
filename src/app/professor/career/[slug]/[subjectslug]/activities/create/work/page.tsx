'use client'
import { H1, H2, Main } from '@/components/utils'
import { OptionsSection } from './components/options-section'
import { v4 } from '@/utils/uuid'
import Link from 'next/link'

interface Props {
  params: {
    slug: string
    subjectslug: string
  }
  searchParams: {
    activitydocumentation: string
    activityname: string
    activitydescription: string
    activitydeadline: string
  }

}

export default function CreateWork ({ params, searchParams }: Props) {
  const files = searchParams?.activitydocumentation != null && searchParams?.activitydocumentation !== ''
    ? JSON.parse(searchParams?.activitydocumentation)
    : []

  // console.log(files)
  return (
    <Main className='flex flex-col h-full w-full gap-20'>
      <header className='border-b-2 border-b-white px-10 py-5'>
        <H1 className='text-white'>Asigna trabajo o actividad</H1>
        <H2 className='text-white'>Sigue las instrucciones en cada apartado para completar y asignar la actividad a tus alumnos correctamente</H2>
      </header>
      <section className='text-center text-white font-bold text-2xl  flex flex-col gap-2'>
        <h1 className='text-white font-bold text-xl'>
          {searchParams?.activityname}
        </h1>
        <p className='text-[#c4ccd3] font-bold text-xl'>
          {searchParams?.activitydescription}
        </p>
        <ul className='text-[#c4ccd3] font-bold text-xl'>
          {files?.map(file => (
            <Link href={file?.url} target='_blank' key={v4()} className='text-[#c4ccd3] font-bold text-xl'>{file?.name}</Link>
          ))}
        </ul>
        <time className='text-[#c4ccd3] font-bold text-xl'>
          {searchParams?.activitydeadline}
        </time>
      </section>
      <OptionsSection />
    </Main>
  )
}
