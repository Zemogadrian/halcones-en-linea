export default function DisplayActivities () {
  const tema = 'Tema 1'
  const actividad = 'Actividad 1'
  const fechaEntrega = '10/10/2024'
  const instrucciones = 'Instrucciones de la actividad'
  const status = 'Entregada'
  const calificacion = '10'

  return (
    <div className='flex flex-row'>
      <section className='h-14 w-3/4  bg-[#cdcbcc] '>
        <div className='h-full flex flex-row items-center'>
          <h1 className='w-full'>ACTIVIDAD</h1>
          <button className='bg-[#808080] w-20 h-full items-center justify-center flex'>
            <img src='/upload.svg' className='h-8' />
          </button>
          <p className='bg-[#2e9d36] w-20 h-full items-center justify-center flex'>
            <img src='/accept.svg' className='h-8' />
          </p>
        </div>
        <div className='flex flex-col text-[#cdcbcc] border-b-2 border-b-white py-10 text-2xl'>
          <span>TEMA: {tema}</span>
          <li>{actividad}</li>
          <li>Fecha de entrega: {fechaEntrega}</li>
          <li>{instrucciones}</li>
          <li>Status: {status}</li>
          <li>Calificación: {calificacion}</li>
        </div>
      </section>

    </div>
  )
}
