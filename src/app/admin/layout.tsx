import Image from 'next/image'

export default function AdminPage () {
  return (
    <div>
      <nav
        className='bg-nav-bg p-2'
      >
        <Image src='/img/logoItesus.png' alt='Logo de itesus' width={120} height={40} />
      </nav>
    </div>
  )
}
