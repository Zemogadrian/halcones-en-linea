
interface Props {
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  action?: (data: FormData) => Promise<void>
}

export const Form = ({ children, onSubmit, action }: Props) => (
  <form onSubmit={onSubmit} action={action} className='w-full'>
    {children}
  </form>
)
