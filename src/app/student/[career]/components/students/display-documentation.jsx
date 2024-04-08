// import { getSubjects, getTopics } from '@/services/supabase/actions'

import { v4 } from '@/utils/uuid'

export default async function DownloadDocumentation () {
  // const subjectId = await getSubjects()

  // const topics = await getTopics({
  //   subjectId: 80,
  //   groupId: 17,
  //   semesterId: 44
  // })

  const temas = [
    {
      nombre: [{ titulo: 'Tema 1' }, { titulo: 'Tema 2' }, { titulo: 'Tema 3' }, { titulo: 'Tema 4' }]
    },
    {
      nombre: [{ titulo: 'Tema 1' }, { titulo: 'Tema 2' }, { titulo: 'Tema 3' }, { titulo: 'Tema 4' }]
    },
    {
      nombre: [{ titulo: 'Tema 1' }, { titulo: 'Tema 2' }, { titulo: 'Tema 3' }, { titulo: 'Tema 4' }]
    },
    {
      nombre: [{ titulo: 'Tema 1' }, { titulo: 'Tema 2' }, { titulo: 'Tema 3' }, { titulo: 'Tema 4' }, { titulo: 'Tema 5' }]
    }
  ]

  return (
    <div className='grid grid-rows-2 gap-10 grid-flow-col p-24 '>
      {temas?.map((topic) => {
        return (
          <div key={v4()} className='bg-[#cdcbcc] rounded-xl p-4 flex flex-col '>
            <h1 className='text-[#848584] mb-5'>Archivos descargables (tema)</h1>
            {topic.nombre.map((title) => {
              return (
                <button key={v4()} className='flex flex-row gap-2 px-2'>
                  <img src='/upload.svg' alt='download' className='h-5 fill-[#848584]' />
                  <span className='text-[#27316c]'>{title.titulo}</span>
                </button>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
