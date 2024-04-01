'use client'
import { H1, H2 } from '@/components/utils'
import { OptionsSection } from './components/options-section'

// import { DescribeAct } from './components/describe-act'
// import { AskDocumentation } from './components/documentation'
// import { DeadlineAct } from './components/deadline'

export default function CreateWork ({ params, searchParams }) {
  return (
    <div className='flex flex-col h-full w-full gap-40'>
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
          {searchParams?.activitydocumentation}
        </h2>
        <h2 className='text-[#c4ccd3] font-bold text-xl'>
          {searchParams?.activitydeadline}
        </h2>
      </div>
      <OptionsSection />
      {/* <DescribeAct />
      <AskDocumentation />
      <DeadlineAct /> */}

    </div>
  )
}
