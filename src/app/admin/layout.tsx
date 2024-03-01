import Image from 'next/image'

export default function AdminPage ({ children }) {
  return (
    <div>
      <nav
        className='bg-nav-bg p-2'
      >
        <Image src='/img/logoItesus.png' alt='Logo de itesus' width={120} height={40} />
      </nav>

      <div className='flex'>

        <div className='flex-1'>
          {children}
        </div>
      </div>
    </div>
  )
}
