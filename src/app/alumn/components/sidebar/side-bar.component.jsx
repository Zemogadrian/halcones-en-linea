import { SideBarItem } from './item.component'

export const SideBar = ({ routes }) => {
  return (
    <ul
      className='flex flex-col gap-1'
    >
      {Object.values(routes).map(({ href, isMultiple, multipleOptions, title }) => (
        <SideBarItem
          href={href}
          isMultiple={isMultiple}
          multipleOptions={multipleOptions}
          key={href}
        >
          {title}
        </SideBarItem>
      ))}
    </ul>
  )
}
