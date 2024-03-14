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

export const H3 = ({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={`text-xl font-medium ${className ?? ''}`}
  >
    {children}
  </h3>
)

export const H4 = ({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h4
    className={`text-lg font-medium ${className ?? ''}`}
  >
    {children}
  </h4>
)

export const H5 = ({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h5
    className={`text-base font-medium ${className ?? ''}`}
  >
    {children}
  </h5>
)

export const H6 = ({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h6
    className={`text-sm font-medium ${className ?? ''}`}
  >
    {children}
  </h6>
)
