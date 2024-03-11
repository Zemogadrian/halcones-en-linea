export default function DisplayTopics () {
  const temas = [
    {
      nombre: [
        { titulo: 'Historia del Derecho' },
        { titulo: 'El derecho y sus fundamentos' },
        { titulo: 'El derecho como un todo' },
        { titulo: 'Estructura del derecho' }],
      titulo: 'Teoria del derecho'
    },
    {
      nombre: [
        { titulo: 'Historia del Derecho' },
        { titulo: 'El derecho y sus fundamentos' },
        { titulo: 'El derecho como un todo' },
        { titulo: 'Estructura del derecho' }],
      titulo: 'Derecho Civil'
    },
    {
      nombre: [
        { titulo: 'Historia del Derecho' },
        { titulo: 'El derecho y sus fundamentos' },
        { titulo: 'El derecho como un todo' },
        { titulo: 'Estructura del derecho' }],
      titulo: 'Derecho Penal'
    },
    {
      nombre: [
        { titulo: 'Historia del Derecho' },
        { titulo: 'El derecho y sus fundamentos' },
        { titulo: 'El derecho como un todo' },
        { titulo: 'Estructura del derecho' }],
      titulo: 'Derecho Laboral'
    }
  ]
  return (
    <div className='grid grid-rows-2 gap-10 grid-flow-col p-24 '>
      {temas.map((tema, index) => {
        return (
          <div key={index} className='bg-[#cdcbcc] rounded-xl p-4 flex flex-col '>
            <h1 className='text-[#898989] mb-5 font-black'>TEMA: {tema.titulo}</h1>
            {tema.nombre.map((titulo, i) => {
              return (
                <div key={i} className='flex flex-row gap-2 px-2 items-center'>
                  <img src='/arrow.svg' alt='download' className='h-2 fill-[#244381] -rotate-90' />
                  <span className='text-[#244381]'>{titulo.titulo}</span>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
