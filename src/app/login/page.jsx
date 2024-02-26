export default function Login () {
  return (
    <div className='w-screen h-screen flex flex-col p-10  gap-4 overflow-hidden' style={{ backgroundImage: 'url(/img/imagen2.jpg)', backgroundSize: 'cover' }}>
      <div className='w-full h-24 flex flex-row justify-between gap-2 items-center p-4 '>
        <img src='/img/logoItesus.png' className=' h-24' />
        {/* <div className=' '>
          <p className='text-2xl text-white px-2 font-bold'>#HALCONESENLINEA</p>
        </div> */}
      </div>
      <div className='flex flex-col text-white justify-center text-2xl items-center py-48 '>
        <form className='p-5 flex flex-col gap-6 justify-center items-center'>
          <div>
            <input type='text' className='font-thin bg-[#417ab1] h-14 placeholder-white rounded-full p-5' name='email' placeholder='Usuario' />
          </div>
          <div>
            <input type='password' className='font-thin bg-[#417ab1] h-14 placeholder-white rounded-full p-5' name='password' placeholder='Contraseña' />
          </div>

          <button className='bg-[#8ea9c6] h-14 w-full rounded-full'>
            Ingresar
          </button>
        </form>
      </div>

    </div>
  )
}
