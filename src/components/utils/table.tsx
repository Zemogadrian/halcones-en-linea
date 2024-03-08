export const Th = ({ children, className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={`text-gray-300 py-1 ${className ?? ''}`}
    {...props}
  >
    {children}
  </th>
)

export const Td = ({ children, className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <td
    className={`text-white text-center ${className ?? ''}`}
    {...props}
  >
    {children}
  </td>
)

export const TableContainer = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <div
    className={`relative overflow-y-auto flex-1 ${className ?? ''}`}
    {...props}
  >
    {children}
  </div>
)

export const Table = ({ children, className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <table
    className={`w-full ${className ?? ''}`}
    {...props}
  >
    {children}
  </table>
)

export const THeadSticky = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <thead
    className='sticky top-0 bg-itesus-primary/50 backdrop-blur-sm text-white'
    {...props}
  >
    {children}
  </thead>
)
