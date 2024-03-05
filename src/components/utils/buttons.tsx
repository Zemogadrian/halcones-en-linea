
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const SubmitButton = ({ children, ...props }: Props) => (
  <button
    className='bg-primary rounded-md text-white px-1 mt-4 shadow-lg bg-itesus-primary w-full py-1 hover:bg-itesus-secondary transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-itesus-secondary focus:border-transparent'
    type='submit'
    {...props}
  >
    {children}
  </button>
)
