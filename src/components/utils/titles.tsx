export const H1 = ({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className={`text-3xl font-semibold ${className ?? ''}`}
  >
    {children}
  </h1>
)

export const H2 = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={`text-2xl font-semibold ${className ?? ''}`}
    {...props}
  >
    {children}
  </h2>
)
