
// Before has a text-gray-300 class
export const Th = ({ children, className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={`py-1 ${className ?? ''}`}
    {...props}
  >
    {children}
  </th>
)

// Before has a text-white class
export const Td = ({ children, className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <td
    className={`text-center ${className ?? ''}`}
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
    className='sticky top-0 bg-itesus-primary/50 backdrop-blur-sm'
    {...props}
  >
    {children}
  </thead>
)

export const Tr = ({ children, className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={`border-b border-b-itesus-tertiary ${className ?? ''}`}
    {...props}
  >
    {children}
  </tr>
)
