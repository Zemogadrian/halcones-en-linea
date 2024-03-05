'use client'

import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import {
  multiDrag,
  selections
} from '@formkit/drag-and-drop'
import { v4 } from '@/utils/uuid'

const className = 'bg-blue-500 text-white'

interface Props {
  options: string[]
}

export function MultiDragAndDrop ({ options = [] }: Props) {
  const [parent1, files1] = useDragAndDrop<HTMLUListElement, string>(options, {
    group: 'A',
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

  const [parent2, files2] = useDragAndDrop<HTMLUListElement, string>([], {
    group: 'A',
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
      className='flex'
    >
      <ul
        ref={parent1}
        className='border flex-1'
      >
        {files1
          .map((file) => (
            <li
              key={file}
              className='file'
            >{file}
            </li>
          ))}
      </ul>
      <ul
        ref={parent2}
        className='border flex-1'
      >
        {files2.map((file) => (
          <li
            key={file}
            className='file'
          >
            {file}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function MultiDragAndDropWithId ({ options = [] }: Props) {
  const [parent, files] = useDragAndDrop<HTMLUListElement, string>(options, {
    group: 'A',
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
      className='flex'
    >
      <ul
        ref={parent}
        className='border flex-1'
      >
        {files
          .map((file) => (
            <li
              key={v4()}
              className='text-gray-100 px-3'
            >
              {file}
            </li>
          ))}
      </ul>
    </div>
  )
}
