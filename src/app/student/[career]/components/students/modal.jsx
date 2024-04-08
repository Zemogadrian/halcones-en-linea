'use client'

import { useSearchParams } from 'next/navigation'

export default function Modal ({ modalNumber, children }) {
  const searchParams = useSearchParams()

  const modal = Number(searchParams.get('modal'))

  return (
    <div className='flex flex-col w-full h-full overflow-hidden gap-5'>

      {modal === modalNumber && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
          {children}
        </div>
      )}
    </div>
  )
}
