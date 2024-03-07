export const Th = ({ children, className }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={`text-gray-300 ${className ?? ''}`}
  >
    {children}
  </th>
)

export const Td = ({ children, className }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <td className={`text-white px-3 ${className ?? ''}`}>
    {children}
  </td>
)
