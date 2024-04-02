'use client'
import { getCareerBySlug } from '@/services/supabase/actions/careers'
import { createActivity } from '@/services/supabase/actions/professors'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRef } from 'react'
import { z } from 'zod'

export const DeadlineAct = () => {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = useParams()
  const newSearchParams = new URLSearchParams(searchParams)

  const $inputDate = useRef<HTMLInputElement>(null)

  const defaultValue = searchParams?.get('activitydeadline') ?? ''
  console.log(newSearchParams?.get('educationPlanId'))

  const handleOnChange = (e) => {
    const queryParams = new URLSearchParams(searchParams)
    queryParams.set('activitydeadline', e?.target.value)

    const URL = `${pathname}?${queryParams.toString()}`
    replace(URL)
  }

  const uploadWork = () => {
    (async () => {
      const career = await getCareerBySlug(
        z.string().parse(params?.slug)
      )

      await createActivity({
        config: {
          type: 'work',
          career: career?.id,
          subject: Number(newSearchParams?.get('subjectId') ?? 0),
          deadline: new Date(searchParams?.get('activitydeadline') ?? '').toISOString(),
          desc: searchParams?.get('activitydescription') ?? '',
          education_plan: Number(newSearchParams?.get('educationPlanId') ?? 0),
          group: Number(newSearchParams?.get('groupId') ?? 0),
          name: searchParams?.get('activityname') ?? '',
          semester: Number(newSearchParams?.get('semesterId') ?? 0)
        },
        questions: null,
        files: []
      })
    })().catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className='flex flex-col gap-10 justify-center items-center'>

      <label
        className='underline-offset-auto text-white bg-transparent border-2 w-[30rem] h-40 text-center font-bold border-slate-500 flex justify-center items-center flex-col gap-2'
      >
        Seleccionar fecha de entrega
        <input defaultValue={defaultValue} ref={$inputDate} type='date' required onChange={handleOnChange} placeholder='Fecha de entrega' className=' text-black' />
      </label>

      <button onClick={uploadWork} className='bg-[#1a62a6] text-white px-4 py-1 rounded-md'>
        Asignar actividad
      </button>
    </div>

  )
}
