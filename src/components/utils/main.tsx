interface Props {
  children: React.ReactNode
}

export const Main = ({ children }: Props) => (
  <main
    className='animate-fade-in animate-duration-150 flex flex-col h-full'
  >
    {children}
  </main>
)
