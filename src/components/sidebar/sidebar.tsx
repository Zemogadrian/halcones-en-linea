import { SideBarMultiItem } from './sidebar-item'
import { v4 } from '@/utils/uuid'
import { SideBarOptions } from './types'

interface Props {
  options: SideBarOptions
}

export const SideBarV2 = ({ options }: Props) => {
  return (
    <aside
      className='bg-[#cdcccb] h-full w-80'
    >

      <ul className='flex flex-col gap-1'>

        {
          options.map((o) => (
            <SideBarMultiItem
              subItems={o.sub}
              key={v4()}
            >
              {o.title}
            </SideBarMultiItem>
          ))
        }

      </ul>

    </aside>
  )
}
