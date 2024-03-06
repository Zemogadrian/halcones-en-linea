export const H1 = ({ children }: { children: React.ReactNode }) => (
  <h1
    className='text-3xl font-semibold mb-4 text-white'
  >
    {children}
  </h1>
)

interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export const H2 = ({ children, className, ...props }: H2Props) => (
  <h2
    className={`text-2xl font-semibold mb-1 text-white ${className ?? ''}`}
    {...props}
  >
    {children}
  </h2>
)
