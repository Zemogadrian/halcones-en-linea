export default async function Kardex () {
  return (
    <main className='w-full overflow-y-hidden flex flex-col justify-center items-center gap-2'>
      <div className='flex-col h-12 flex w-full'>
        <p className='text-2xl px-5 h-full flex items-center text-[#1f5186] bg-[#fff]'>KARDEX HUGO ADRIAN MUÑOZ GOMEZ 2do 'C'</p>
      </div>
      <div className='bg-[#b4b5b5] flex flex-col w-full h-full p-5'>
        <p>Fecha de solicitud: 25 de mayo de 2024</p>
      </div>
      <button className='bg-[#e51a1f] text-[#fff] px-2 w-36'>
        <p>SOLICITAR KARDEX</p>
      </button>
    </main>
  )
}
