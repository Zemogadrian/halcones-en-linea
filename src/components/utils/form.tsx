
interface Props {
  children: React.ReactNode
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const Form = ({ children, onSubmit }: Props) => (
  <form onSubmit={onSubmit} className='w-full'>
    {children}
  </form>
)
