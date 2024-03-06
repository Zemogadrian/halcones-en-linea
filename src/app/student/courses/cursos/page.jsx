'use client'
import { useState } from 'react'
import Modal from '../../components/students/modal'

export default function Cursos () {
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)

  return (
    <main className='flex flex-col w-full  h-full overflow-hidden gap-5'>
      <div className='flex flex-row justify-between px-10 items-center'>
        <div className='text-white'>
          <p className='underline text-xl'>Fecha de inicio</p>
          <p className='px-5'>15 de Octubre</p>
        </div>
        <button className=' rounded-2xl px-10 p-1 bg-[#32374d]' onClick={() => setShowModal(true)}>
          <p className='text-white italic'>Inscribirse</p>
        </button>
      </div>
      <div className='bg-white h-[0.05rem] px-20 flex flex-col rounded-xl' />
      <div className='gap-5 flex flex-col p-10 h-full'>
        <div className='text-white'>
          <p className='underline text-xl'>Diplomado en Marketing de Contenidos: Impulsa tu Estrategia Digital</p>
          <p className=''>Párrafo descriptivo</p>
        </div>
      </div>
      <div className='bg-white h-[0.05rem] px-20 flex flex-col rounded-xl' />

      <Modal showModal={showModal} setShowModal={setShowModal} showModal2={showModal2} setShowModal2={setShowModal2}>
        <p>¿Seguro que deseas inscribirte al curso?</p>
      </Modal>
      <Modal showModal2={showModal2} setShowModal2={setShowModal2} setShowModal={setShowModal}>
        <p>Gracias por inscribirte, sigue los pasos que se te enviaron por correo.</p>
      </Modal>
    </main>
  )
}
