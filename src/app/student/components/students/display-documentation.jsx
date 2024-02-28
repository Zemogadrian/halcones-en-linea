import { getTopics } from '@/services/halcones/actions'

export default function DownloadDocumentation () {
  const topics = getTopics({
    groupId: '1',
    semesterId: '1',
    subjectId: '1'
  }
  )
  // const temas = [
  //   {
  //     nombre: [{ titulo: 'Tema 1' }, { titulo: 'Tema 2' }, { titulo: 'Tema 3' }, { titulo: 'Tema 4' }]
  //   },
  //   {
  //     nombre: [{ titulo: 'Tema 1' }, { titulo: 'Tema 2' }, { titulo: 'Tema 3' }, { titulo: 'Tema 4' }]
  //   },
  //   {
  //     nombre: [{ titulo: 'Tema 1' }, { titulo: 'Tema 2' }, { titulo: 'Tema 3' }, { titulo: 'Tema 4' }]
  //   },
  //   {
  //     nombre: [{ titulo: 'Tema 1' }, { titulo: 'Tema 2' }, { titulo: 'Tema 3' }, { titulo: 'Tema 4' }, { titulo: 'Tema 5' }]
  //   }
  // ]

  return (
    <div className='grid grid-rows-2 gap-10 grid-flow-col p-24 '>
      {topics?.map((tema, index) => {
        return (
          <div key={index} className='bg-[#cdcbcc] rounded-xl p-4 flex flex-col '>
            <h1 className='text-[#848584] mb-5'>Archivos descargables (tema)</h1>
            {tema.nombre.map((titulo, i) => {
              return (
                <button key={i} className='flex flex-row gap-2 px-2'>
                  <img src='/upload.svg' alt='download' className='h-5 fill-[#848584]' />
                  <span className='text-[#27316c]'>{titulo.titulo}</span>
                </button>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
