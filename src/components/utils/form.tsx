
interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
}

export const Form = ({ children, onSubmit, action }: Props) => (
  <form onSubmit={onSubmit} action={action} className='w-full'>
    {children}
  </form>
)
