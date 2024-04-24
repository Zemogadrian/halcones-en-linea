'use client'

// import { uploadWorkActivity } from '@/services/supabase/actions/activities'
import { useRef, useState } from 'react'

interface Props {
  activityId: string
  open?: boolean
}

const className = {
  itesusGradient: 'bg-gradient-to-r from-itesus-primary to-itesus-secondary text-white'
}

export const UploadFileModal = ({ activityId, open = false }: Props) => {
  const $fileInput = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  return (
    <dialog
      open={open}
      className='bg-black/30 w-screen h-screen top-0 flex justify-center items-center'
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()

          //     const base

        //   uploadWorkActivity(activityId, {
        //     name: fileName ?? '',
        //     file: $fileInput.current?.files?.[0]
        //   })
        //     .catch((err) => {
        //       console.error('Error uploading file:', err)
        //     })
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
