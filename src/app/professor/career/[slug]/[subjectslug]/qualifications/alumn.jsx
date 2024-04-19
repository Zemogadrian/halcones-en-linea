import { ShyScrollbar } from '@/components/utils'

export const Alumn = () => {
  const alumn = [
    { name: 'Juan Pérez', qualification: 10 },
    { name: 'Juan Pérez', qualification: 10 },
    { name: 'Juan Pérez', qualification: 10 },
    { name: 'Juan Pérez', qualification: 10 },
    { name: 'Juan Pérez', qualification: 10 },
    { name: 'Juan Pérez', qualification: 10 },
    { name: 'Juan Pérez', qualification: 10 },
    { name: 'Juan Pérez', qualification: 10 },
    { name: 'Juan Pérez', qualification: 10 },
    { name: 'Juan Pérez', qualification: 10 },
    { name: 'Juan Pérez', qualification: 10 },
    { name: 'Juan Pérez', qualification: 10 },
    { name: 'Juan Pérez', qualification: 10 },
    { name: 'Juan Pérez', qualification: 10 },
    { name: 'Juan Pérez', qualification: 10 }

  ]
  return (
    <section className='w-full flex flex-col gap-5 overflow-auto px-2' style={ShyScrollbar}>
      {alumn.map((alumn, i) => (
        <div key={i} className='flex flex-row gap-5 '>
          <h1 className='w-full bg-white text-[#474563] rounded-md p-1'>{alumn.name}</h1>
          <span className='px-10 bg-white text-[#474563] text-center p-1 rounded-md'>{alumn.qualification}</span>
        </div>
      ))}
    </section>
  )
}
