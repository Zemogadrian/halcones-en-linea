'use client'

import { useRef } from 'react'

export function ActivityDisplay () {
  const tema = 'Tema 1'
  const actividad = 'Actividad 1'
  const fechaEntrega = '10/10/2024'
  const instrucciones = 'Instrucciones de la actividad'
  const status = 'Entregada'
  const calificacion = '10'

  const $fileInput = useRef<HTMLInputElement>(null)

  return (
    <article>
      <input ref={$fileInput} type='file' className='hidden' />
      <div
        className='flex bg-[#2e9d36] rounded-lg overflow-hidden'
      >
        <div className='flex-1 bg-white flex items-center px-3'>
          <span
            className='upper font-medium'
          >
            ACTIVIDAD
          </span>
        </div>

        <button
          onClick={() => {
            $fileInput.current?.click()
          }}
          className='bg-[#808080] flex items-center justify-center rounded-r-lg py-2 px-4'
        >
          <img src='/upload.svg' className='h-6' alt='' />
        </button>

        <button
          className='px-2'
        >
          <img src='/accept.svg' className='h-4' alt='' />
        </button>

      </div>

      {/* <div className='flex bg-[#2e9d36] rounded-lg'>
        <h1 className='flex items-center w-full text-2xl px-5 h-full bg-[#cdcbcc] '>ACTIVIDAD</h1>
        <input type='file' id='file' className=' w-20 h-full items-center justify-center  hidden' />
        <label for='file' className='bg-[#808080] h-full flex justify-center items-center rounded-r-lg'>
          <img src='/upload.svg' className='h-8 w-20' alt='' />
        </label>
        <div className='bg-[#2e9d36] w-14 h-full items-center justify-center flex rounded-r-lg border'>
          <img src='/accept.svg' className='h-4' alt='' />
        </div>
      </div> */}
      <div className='flex flex-col text-[#cdcbcc] border-b-2 border-b-white py-10 text-xl'>
        <span>TEMA: {tema}</span>
        <li>{actividad}</li>
        <li>Fecha de entrega: {fechaEntrega}</li>
        <li>{instrucciones}</li>
        <li>Status: {status}</li>
        <li>Calificación: {calificacion}</li>
      </div>
    </article>
  )
}
