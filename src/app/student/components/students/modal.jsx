'use client'

export default function Modal ({ showModal, setShowModal, showModal2, setShowModal2, children, children2 }) {
  return (
    <main className='flex flex-col w-full h-full overflow-hidden gap-5'>
      {showModal && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-lg py-5 gap-10 w-1/3'>
            <h2 className='flex flex-col w-full bg-gradient-to-tr from-[#1f5186] to-[#131a2d] text-white text-center'>{children}</h2>
            <div className='flex flex-row justify-around gap-5 py-3'>
              <button onClick={() => setShowModal2(true)} className='bg-gradient-to-tr from-[#1f5186] to-[#131a2d] text-white font-black px-14 rounded-lg'>SI</button>
              <button onClick={() => setShowModal(false)} className='bg-gradient-to-tr from-[#1f5186] to-[#131a2d] text-white font-black px-14 rounded-lg'>NO</button>
            </div>
          </div>
        </div>
      )}
      {showModal2 && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-lg py-5 gap-10 w-1/3'>
            <h2 className='flex flex-col w-full bg-gradient-to-tr from-[#1f5186] to-[#131a2d] text-white text-center'>{children}</h2>
            <div className='flex flex-row justify-around gap-5 py-3'>
              <button
                onClick={() => {
                  setShowModal2(false)
                  setShowModal(false)
                }} className='bg-gradient-to-tr from-[#1f5186] to-[#131a2d] text-white font-black px-14 rounded-lg'
              >Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
