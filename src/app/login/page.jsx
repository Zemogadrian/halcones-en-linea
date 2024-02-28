import { LoginButton } from './components/login-button'

export default function Login () {
  return (
    <main className='w-screen h-screen flex flex-col p-10  gap-4 overflow-hidden' style={{ backgroundImage: 'url(/img/imagen2.jpg)', backgroundSize: 'cover' }}>
      <div className='w-full h-24 flex flex-row justify-between gap-2 items-center p-4 '>
        <img src='/img/logoItesus.png' className=' h-24' />
      </div>
      <LoginButton />
    </main>
  )
}
