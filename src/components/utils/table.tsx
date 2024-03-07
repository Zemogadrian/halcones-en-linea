export const Th = ({ children, className }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={`text-gray-300 py-1 ${className ?? ''}`}
  >
    {children}
  </th>
)

export const Td = ({ children, className }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <td className={`text-white text-center ${className ?? ''}`}>
    {children}
  </td>
)
