
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const SubmitButton = ({ children, ...props }: Props) => (
  <button
    className='bg-primary rounded-md text-white px-1 mt-4 shadow-lg bg-itesus-primary w-full py-1'
    type='submit'
    {...props}
  >
    {children}
  </button>
)
