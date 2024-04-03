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
    activitydocumentation?: string
    activityname?: string
    activitydescription?: string
    activitydeadline?: string
  }

}

export default function CreateWork ({ searchParams }: Props) {
  const files = searchParams?.activitydocumentation != null && searchParams?.activitydocumentation !== ''
    ? JSON.parse(searchParams?.activitydocumentation)
    : []

  // console.log(files)
  return (
    <Main>
      <header className='border-b-2 border-b-white px-10 pb-5'>
        <H1 className='text-white'>Asigna trabajo o actividad</H1>
        <H2 className='text-white'>Sigue las instrucciones en cada apartado para completar y asignar la actividad a tus alumnos correctamente</H2>
      </header>
      <section className='text-center text-white font-bold text-2xl flex-1 flex flex-col gap-2'>
        <div className='h-[30%] overflow-y-auto mt-3'>
          {searchParams?.activityname != null && (
            <h1 className='text-white font-bold text-xl'>
              {searchParams?.activityname}
            </h1>
          )}

          {searchParams?.activitydescription != null && (
            <p className='text-[#c4ccd3] font-bold text-xl'>
              {searchParams?.activitydescription}
            </p>
          )}

          {files.length > 0 && (
            <ul className='flex flex-col'>
              {files?.map(file => (
                <Link href={file?.url} target='_blank' key={v4()} className='text-[#c4ccd3] font-bold text-xl'>{file?.name}</Link>
              ))}
            </ul>
          )}

          {searchParams?.activitydeadline != null && (
            <time className='text-[#c4ccd3] font-bold text-xl'>
              {searchParams?.activitydeadline}
            </time>
          )}
        </div>
        <OptionsSection />
      </section>
    </Main>
  )
}
