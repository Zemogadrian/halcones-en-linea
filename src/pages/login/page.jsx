import background from '../img/Imagen2.jpg'
export default function Login () {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const email = form.get('email')
    const password = form.get('password')
    if (email === 'admin' && password === 'admin') {
      console.log('login')
    } else {
      console.log('error')
    }
  }
  return (
    <div className='w-screen h-screen flex flex-col p-10  gap-4 overflow-hidden' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
      <div className='w-full h-24 flex flex-row justify-between gap-2 items-center p-4 '>
        {/* <img src={Logo} className=' h-24' /> */}
        <div className=' '>
          <p className='text-2xl text-white px-2 font-bold'>#HALCONESENLINEA</p>
        </div>
      </div>
      <div className='flex flex-col text-white justify-center text-2xl items-center py-48'>
        <form onSubmit={handleSubmit} className='p-5 flex flex-col gap-4 justify-center items-center'>
          <label>
            <span className="after:content-['*'] after:ml-0.5 after:text-white block font-medium">
              Usuario
            </span>
            <input type='text' className='text-black' name='email' />
          </label>
          <label class='block'>
            <span className="after:content-['*'] after:ml-0.5 after:text-white block font-medium">Contraseña</span>
            <input type='password' className='text-black' name='password' />
          </label>
          <div className='bg-[#7f8fac65] h-10'>
            Ingresar
          </div>
        </form>
      </div>

    </div>
  )
}
