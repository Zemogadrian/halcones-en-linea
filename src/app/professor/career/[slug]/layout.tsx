import { DistroNavASide } from '@/app/layouts/distro-nav-aside'

export default function Layout ({ children }) {
  return (
    <DistroNavASide
      navbar={
        <nav
          className='bg-nav-bg p-2 flex justify-between items-center'
        >
          <img
            className='aspect-[24/9] w-28'
            src='/img/logo-itesus.png' alt='Logo de itesus'
          />
        </nav>
            }
      options={[]}
    >
      {children}
    </DistroNavASide>
  )
}
