'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const AskDocumentation = async () => {
  const { replace } = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const handleOnChange = (e) => {
    const queryParams = new URLSearchParams(params)

    queryParams.set('activitydocumentation', e.target.value)

    const URL = `${pathname}?${queryParams.toString()}`
    replace(URL)
  }

  //   const handleDragOver = (e) => {
  //     e.preventDefault()
  //   }

  //   const handleDrop = (e) => {
  //     e.preventDefault()

  //     if (e.dataTransfer.items) {
  //       for (let i = 0; i < e.dataTransfer.items.length; i++) {
  //         if (e.dataTransfer.items[i].kind === 'file') {
  //           const file = e.dataTransfer.items[i].getAsFile()
  //           console.log('... file[' + i + '].name = ' + file.name)
  //         }
  //       }
  //     }
  //   }
  return (
    <div className='flex flex-row gap-10 justify-center items-center'>
      <button>
        <img src='/arrow.svg' alt='' className='w-14 h-14 rotate-90' />
      </button>
      <input type='file' onChange={handleOnChange} placeholder='Arrastra tu documentación requerida para la actividad Ej: Archivo .pdf | .doc | .jpg | .ppt | .xls' className='underline-offset-auto text-white bg-transparent border-2 w-[30rem] h-40 text-center font-bold border-slate-500' />
      {/* <input
        type='file'
        onChange={handleOnChange}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        placeholder='Arrastra tu documentación requerida para la actividad Ej: Archivo .pdf | .doc | .jpg | .ppt | .xls'
        className='underline-offset-auto text-white bg-transparent border-2 w-[30rem] h-40 text-center font-bold border-slate-500'
      /> */}
      <button>
        <img src='/arrow.svg' alt='' className='w-14 h-14 -rotate-90' />
      </button>
    </div>
  )
}
