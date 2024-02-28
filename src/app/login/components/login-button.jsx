import { login } from '../../../services/halcones/actions'

export const LoginButton = () => {
  return (
    <section className='flex flex-col text-white justify-center text-2xl items-center py-48 '>
      <form className='p-5 flex flex-col gap-6 justify-center items-center' action={login}>
        <div className='flex flex-row rounded-full bg-[#417ab1] items-center px-5 gap-5'>
          <img src='/user.svg' alt='' className='h-10 w-10' />
          <input
            type='text'
            className='font-thin h-14 bg-[#417ab1] placeholder-white '
            name='email'
            placeholder='Usuario'

          />
        </div>
        <div className='flex flex-row rounded-full bg-[#417ab1] items-center px-5 gap-5'>
          <img src='/upload.svg' className='h-10 w-10' alt='' />
          <input
            type='password'
            className='font-thin bg-[#417ab1] h-14 placeholder-white '
            name='password'
            placeholder='Contraseña'

          />
        </div>
        <button className='bg-[#8ea9c6] h-14 w-full rounded-full'>
          Ingresar
        </button>
      </form>
    </section>
  )
}
