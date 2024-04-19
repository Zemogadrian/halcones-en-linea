import { ShyScrollbar } from '@/components/utils'

export const Works = () => {
  const works = [
    { name: 'Juan Pérez', file: 'Nombre del archivo', type: 'Tipo de archivo', status: 'Status', img: '/imgs.png' },
    { name: 'Juan Pérez', file: 'Nombre del archivo', type: 'Tipo de archivo', status: 'Status', img: '/imgs.png' },
    { name: 'Juan Pérez', file: 'Nombre del archivo', type: 'Tipo de archivo', status: 'Status', img: '/imgs.png' },
    { name: 'Juan Pérez', file: 'Nombre del archivo', type: 'Tipo de archivo', status: 'Status', img: '/imgs.png' },
    { name: 'Juan Pérez', file: 'Nombre del archivo', type: 'Tipo de archivo', status: 'Status', img: '/imgs.png' },
    { name: 'Juan Pérez', file: 'Nombre del archivo', type: 'Tipo de archivo', status: 'Status', img: '/imgs.png' },
    { name: 'Juan Pérez', file: 'Nombre del archivo', type: 'Tipo de archivo', status: 'Status', img: '/imgs.png' },
    { name: 'Juan Pérez', file: 'Nombre del archivo', type: 'Tipo de archivo', status: 'Status', img: '/imgs.png' },
    { name: 'Juan Pérez', file: 'Nombre del archivo', type: 'Tipo de archivo', status: 'Status', img: '/imgs.png' },
    { name: 'Juan Pérez', file: 'Nombre del archivo', type: 'Tipo de archivo', status: 'Status', img: '/imgs.png' }
  ]
  return (
    <section className='grid grid-cols-2 gap-10 w-full overflow-auto p-2' style={ShyScrollbar}>
      {works.map((work, i) => (
        <div key={i} className='rounded-xl bg-[#cdcbcc] text-[#959595] grid grid-cols-2 grid-flow-row w-full h-[8rem] items-center'>
          <img src={work.img} alt='work' className='w-20 h-20 rounded-xl' />
          <div className='flex flex-col px-5 '>
            <span className='underline text-[#959595] text-start'>{work.name}</span>
            <span className='text-[#959595] text-start'>{work.file}</span>
            <span className='text-[#959595] text-start'>{work.type}</span>
            <span className='text-[#959595] text-end'>{work.status}</span>
          </div>
        </div>
      ))}

    </section>
  )
}
