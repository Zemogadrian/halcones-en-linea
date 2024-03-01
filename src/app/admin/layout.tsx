import Image from 'next/image'
import { DistroNavASide } from '../layouts/distro-nav-aside'
import { routes } from './data'

export default function AdminPage ({ children }) {
  return (
    <DistroNavASide
      navbar={(
        <nav
          className='bg-nav-bg p-2'
        >
          <Image src='/img/logoItesus.png' alt='Logo de itesus' width={120} height={40} />
        </nav>
      )}
      options={routes}
    >
      {children}
    </DistroNavASide>
  )
}
