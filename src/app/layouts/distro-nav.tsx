
interface Props {
  children: React.ReactNode
  navbar: React.JSX.Element
}

export const DistroNav = ({ children, navbar }: Props) => {
  return (
    <div className='h-screen flex flex-col '>
      {navbar}
      <div className='flex flex-1 overflow-hidden'>
        <div className='flex-1 h-full bg-gradient-to-tr from-[#1f5186] to-[#131a2d] overflow-y-auto px-11 py-8'>
          {children}
        </div>
      </div>
    </div>
  )
}
