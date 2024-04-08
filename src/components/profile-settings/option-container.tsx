'use client'

import LogoutButton from '../logout'

interface Props {
  ref: React.RefObject<HTMLDivElement>
  className?: string
}

export const OptionContainer = ({ ref, className }: Props) => {
  return (
    <div
      ref={ref}
      className={`absolute top-12 right-0 bg-[#394075] rounded-lg shadow-md ${className ?? ''}`}
    >
      <LogoutButton
        className='text-white w-full text-left hover:bg-[#b0b0b0] rounded-lg px-3 py-1 transition-colors'
      >
        Cerrar sesión
      </LogoutButton>
    </div>
  )
}
