'use client'
import { useState } from 'react'
import Modal from '../../components/students/modal'

export default function Kardex () {
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)

  return (
    <main className='flex flex-col w-full h-full overflow-hidden gap-5'>
      <div className='flex flex-row justify-between px-10 items-center'>
        <div className='text-white'>
          <p className='underline text-xl'>Pedro Ortíz Júarez</p>
          <p className=''>Lic. En Mercadotecnia Internacional</p>
        </div>
        <button className='rounded-2xl px-10 p-1 bg-[#32374d]' onClick={() => setShowModal(true)}>
          <p className='text-white italic'>SOLICITAR KÁRDEX</p>
        </button>
      </div>
      <div className='bg-white h-[0.05rem] px-20 flex flex-col rounded-xl' />
      <div className='gap-5 flex flex-col p-10'>
        <h1 className='underline text-white font-black text-xl'>Pasos a seguir para la solicitud de tu kárdex</h1>
        <p className='text-white flex flex-col gap-3 italic'>
          <span className='font-black'>1.-<span className='font-normal'>Da click en el botón "solicitar Kárdex"</span></span>
          <span className='font-black'>2.-<span className='font-normal'>Te llegará un correo de confirmación con los datos bancarios para realizar el pago correspondiente.</span></span>
          <span className='font-black'>3.-<span className='font-normal'>Envía tu comprobante de pago al correo</span> nataly.soto@itesus.edu.mx</span>
          <span className='font-black'>4.-<span className='font-normal'>En un lapso de 72 horas tendrás tu kárdex en tu correo electrónico</span></span>
        </p>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} showModal2={showModal2} setShowModal2={setShowModal2}>
        <span>¿Seguro que deseas solicitar tu kárdex?</span>
      </Modal>
      <Modal showModal2={showModal2} setShowModal2={setShowModal2} setShowModal={setShowModal}>
        <p>Solicitud enviada con éxito. Revisa tu correo electrónico.</p>
      </Modal>
    </main>
  )
}
