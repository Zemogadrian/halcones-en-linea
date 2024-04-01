'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface Props {
  onNav?: (currentPosition: number) => void
  children: React.ReactNode
}

export const DisplayOptions = ({ onNav, children }: Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const setPosition = (position: number) => {
    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set('position', position.toString())

    router.replace(`${pathname}?${newSearchParams.toString()}`)
  }

  const handleNav = (direction: string) => () => {
    const oldPosition = parseInt(searchParams.get('position') ?? '1')

    const newPosition = direction === '+'
      ? oldPosition + 1
      : oldPosition > 1
        ? oldPosition - 1
        : 1

    onNav?.(newPosition)
    setPosition(newPosition)
  }

  return (
    <div className='flex flex-row gap-1 h-full justify-center border items-center overflow-x-hidden'>
      <button onClick={handleNav('-')}>
        <img src='/arrow.svg' alt='' className='w-14 h-14 rotate-90' />
      </button>
      <div className='relative aspect-[20/9] h-full border'>
        {children}
        {/* <AskDocumentation direction={direction} currentPosition={position} position={3} />
          <DeadlineAct direction={direction} currentPosition={position} position={4} /> */}
      </div>
      <button onClick={handleNav('+')}>
        <img src='/arrow.svg' alt='' className='w-14 h-14 -rotate-90' />
      </button>
    </div>
  )
}
