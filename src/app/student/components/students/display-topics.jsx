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
            <h1 className='text-[#848584] mb-5'>TEMA: {tema.titulo}</h1>
            {tema.nombre.map((titulo, i) => {
              return (
                <div key={i} className='flex flex-row gap-2 px-2'>
                  <img src='/square.svg' alt='download' className='h-5 fill-[#848584]' />
                  <span className='text-[#27316c]'>{titulo.titulo}</span>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
