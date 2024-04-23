'use client'

import { uploadWorkActivity } from '@/services/supabase/actions/activities'
import { useRef, useState } from 'react'

interface Props {
  activityId: number
  open?: boolean
}

const className = {
  itesusGradient: 'bg-gradient-to-r from-itesus-primary to-itesus-secondary text-white'
}

export const UploadFileModal = ({ activityId }: Props) => {
  const $fileInput = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  return (
    <dialog
      open
      className='bg-black/30 w-screen h-screen top-0 flex justify-center items-center'
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()

          const message = new FormData(e.currentTarget).get('message')?.toString() ?? ''

          const file = $fileInput.current?.files?.[0]

          if (file == null) {
            return
          }

          file.arrayBuffer()
            .then(arrayBuffer => {
              const base64 = Buffer.from(arrayBuffer).toString('base64')

              uploadWorkActivity(
                activityId,
                {
                  name: fileName ?? '',
                  bytes: base64
                },
                message
              )
                .catch((err) => {
                  console.error('Error uploading file:', err)
                })
            })
            .catch((err) => {
              console.error('Error getting file array buffer:', err)
            })
        }}
        className='bg-white py-5 rounded-md min-w-[30rem]'
      >
        <input
          ref={$fileInput}
          type='file'
          className='hidden'
          onChange={(e) => {
            const file = e.target.files?.[0]

            if (file != null) {
              setFileName(file.name)
            }
          }}
        />

        <button
          onClick={() => {
            $fileInput.current?.click()
          }}
          type='button'
          className={`${className.itesusGradient} px-5 font-bold w-full text-lg mb-2`}
        >
          {fileName ?? 'Seleccionar archivo'}
        </button>

        <label className='px-5 flex flex-col mb-2'>
          <span
            className='font-semibold text-base'
          >
            Mensaje:
          </span>
          <textarea
            name='message'
            className='border p-2 min-h-20 max-h-96'
          />
        </label>

        <footer className='flex justify-center px-5 items-center'>
          <button
            className={`${className.itesusGradient} px-7 font-bold rounded-md text-lg`}
          >
            Enviar
          </button>
        </footer>
      </form>
    </dialog>
  )
}
