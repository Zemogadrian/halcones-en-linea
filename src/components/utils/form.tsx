
interface Props {
  children: React.ReactNode
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const Form = ({ children, handleSubmit }: Props) => (
  <form onSubmit={handleSubmit} className='w-full'>
    {children}
  </form>
)
