import { NavBar } from '@/app/alumn/components/navbar/navbar'

export default function AlumnLayout ({ children }) {
  return (
    <div className='h-dvh flex flex-col'>
      <NavBar />
      <div className='flex flex-1'>
        {children}
      </div>
    </div>
  )
}
