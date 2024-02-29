
export default function DisplayActivities () {
  const tema = 'Tema 1'
  const actividad = 'Actividad 1'
  const fechaEntrega = '10/10/2024'
  const instrucciones = 'Instrucciones de la actividad'
  const status = 'Entregada'
  const calificacion = '10'

  return (
    <div className='flex flex-row items-center justify-center'>
      <section className='h-10 w-3/4 bg-[#2e9d36] rounded-lg '>
        <div className='h-full flex flex-row'>
          <h1 className='flex items-center w-full text-2xl px-5 h-full bg-[#cdcbcc] '>ACTIVIDAD</h1>
          <input type='file' id='file' className=' w-20 h-full items-center justify-center  hidden' />
          <label for='file' className='bg-[#808080] h-full flex justify-center items-center rounded-r-lg'>
            <img src='/upload.svg' className='h-8 w-20' alt='' />
          </label>
          <p className='bg-[#2e9d36] w-14 h-full items-center justify-center flex rounded-r-lg'>
            <img src='/accept.svg' className='h-4' alt='' />
          </p>
        </div>
        <div className='flex flex-col text-[#cdcbcc] border-b-2 border-b-white py-10 text-xl'>
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
