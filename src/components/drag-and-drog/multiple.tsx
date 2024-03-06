'use client'

import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import {
  multiDrag,
  selections
} from '@formkit/drag-and-drop'
import { v4 } from '@/utils/uuid'

const className = 'bg-blue-500 text-white'

interface Props {
  group?: string
  options: string[]
}

export function MultiDragAndDrop ({ options = [], group = 'A' }: Props) {
  const [parent, files] = useDragAndDrop<HTMLUListElement, string>(options, {
    group,
    plugins: [
      multiDrag({
        plugins: [
          selections({
            selectedClass: className
          })
        ]
      })
    ]
  })

  return (
    <div
      className='flex-1 w-full'
    >
      <ul
        ref={parent}
        className='flex min-h-16 w-full justify-start items-start flex-wrap'
      >
        {files.map((file) => (
          <li
            key={v4()}
            className='px-3 h-min mr-2 mb-2 rounded-md bg-blue-500 text-white cursor-pointer'
          >
            {file}
          </li>
        ))}
      </ul>
    </div>
  )
}
