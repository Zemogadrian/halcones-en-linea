'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  modalNumber?: number
  actionType?: 'open' | 'close'
}

export const ModalButton = ({ modalNumber = 0, actionType = 'open', children, className, onClick, ...props }: Props) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  return (
    <button
      className={`rounded-2xl px-10 p-1 bg-[#32374d] ${className ?? ''}`}
      onClick={(e) => {
        const newSearchParams = new URLSearchParams(searchParams)

        if (actionType === 'open') {
          newSearchParams.set('modal', modalNumber.toString())
        } else {
          newSearchParams.delete('modal')
        }

        replace(`${pathname}?${newSearchParams.toString()}`)

        onClick?.(e)
      }}
      {...props}
    >
      <p className='text-white italic'>{children}</p>
    </button>
  )
}
