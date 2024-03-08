export const H1 = ({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className={`text-3xl font-semibold mb-4 text-white ${className ?? ''}`}
  >
    {children}
  </h1>
)

export const H2 = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={`text-2xl font-semibold mb-1 text-white ${className ?? ''}`}
    {...props}
  >
    {children}
  </h2>
)
