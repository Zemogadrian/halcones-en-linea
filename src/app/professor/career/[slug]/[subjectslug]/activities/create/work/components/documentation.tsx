'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const AskDocumentation = () => {
  const { replace } = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const handleOnChange = (e) => {
    const queryParams = new URLSearchParams(params)

    queryParams.set('activitydocumentation', e.target.value)

    const URL = `${pathname}?${queryParams.toString()}`
    replace(URL)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()

    const files: Array<{
      name: string
      url: string
    }> = []

    if (e.dataTransfer.items != null) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          const file = e.dataTransfer.items[i].getAsFile()

          if (file == null) return

          const fileUrl = URL.createObjectURL(file)
          const fileName = file.name

          files.push({ name: fileName, url: fileUrl })
        }
      }
    }

    console.log(files)

    // console.log(atob(JSON.stringify(files)))
    const queryParams = new URLSearchParams(params)

    queryParams.set('activitydocumentation', JSON.stringify(files))
    const url = `${pathname}?${queryParams?.toString()}`
    replace(url)
  }
  return (

  // <input type='file' onChange={handleOnChange} placeholder='Arrastra tu documentación requerida para la actividad Ej: Archivo .pdf | .doc | .jpg | .ppt | .xls' className='underline-offset-auto text-white bg-transparent border-2 w-[30rem] h-40 text-center font-bold border-slate-500' />
    <input
      type='file'
      onChange={handleOnChange}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      required
      placeholder='Arrastra tu documentación requerida para la actividad Ej: Archivo .pdf | .doc | .jpg | .ppt | .xls'
      className='underline-offset-auto text-white bg-transparent border-2 w-[30rem] h-40 text-center font-bold border-slate-500'
    />

  )
}
