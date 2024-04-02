import Link from 'next/link'

export default function Activities ({ params, searchParams }) {
  console.log(params, searchParams)
  const newSearchParams = new URLSearchParams(searchParams)

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-row gap-2'>
        <div className='bg-white text-[#21264a] rounded-md px-2'>
          Mis actividades
        </div>
        <Link
          href={`/professor/career/${params.slug}/${params.subjectslug ?? ''}/activities/create?${newSearchParams.toString()}`}
        >
          <div className='text-white bg-[#1264ac] rounded-full justify-center items-center flex w-7 h-7'>+</div>
        </Link>
      </div>
      <div>
        <h2>Activity 1</h2>
        <p>Activity description</p>
        <p>Activity deadline</p>
      </div>
    </div>
  )
}
