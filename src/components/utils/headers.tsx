
export const HeaderBetween = ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <header
    className={`flex items-center justify-between mb-4 ${className ?? ''}`}
    {...props}
  >
    {children}
  </header>
)
