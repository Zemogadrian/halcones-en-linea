export default async function Becas () {
  return (
    <main className='flex flex-col  h-full overflow-hidden gap-5'>
      <div className='flex flex-row justify-between px-10 items-center'>
        <div className='text-white'>
          <p className='underline text-xl'>Nombre de la beca</p>
          <p className='px-5'>Fecha de vencimiento</p>
        </div>
        <button className=' rounded-2xl px-10 p-1 bg-[#32374d]'>
          <p className='text-white italic'>SOLICITAR BECA</p>
        </button>
      </div>
      <div className='bg-white h-[0.05rem] px-20 flex flex-col rounded-xl' />
      <div className='gap-5 flex flex-col p-10'>
        <div className='text-white'>
          <p className='underline text-xl'>Descripción de la beca</p>
          <p className=''>Párrafo descriptivo</p>
        </div>
        <h1 className='underline text-white font-black text-xl'>Pasos a seguir para la solicitud de tu kárdex</h1>
        <p className='text-white flex flex-col gap-3 italic'>
          <span className='font-black'>1.-<span className='font-normal'>Da click en el botón "solicitar beca"</span></span>
          <span className='font-black'>2.-<span className='font-normal'>Te llegará un correo de confirmación de solicitud de beca.</span></span>
          <span className='font-black'>3.-<span className='font-normal'>Revisa tu correo con regularidad para saber el status de tu beca</span></span>
          <span className='font-black'>4.-<span className='font-normal'>Si es aprobada, se te enviarán nuevos pasos a seguir</span></span>
        </p>
      </div>
      <div className='bg-white h-[0.05rem] px-20 flex flex-col rounded-xl' />

    </main>
  )
}
