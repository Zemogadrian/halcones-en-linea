export default function MetodosPago () {
  return (
    <main className='flex flex-row justify-center overflow-hidden gap-14 w-full h-full items-center'>
      <div className='rounded-2xl px-10 p-4 bg-[#cdcbcc] flex flex-col h-40'>
        <span className='font-bold text-lg underline  text-[#898989]  text-center'>Efectivo</span>
        <span className='text-[#27316e]'>Pagos directamente en la institución</span>
      </div>
      <div className='rounded-2xl px-10 p-4 bg-[#cdcbcc] flex flex-col h-40'>
        <span className=' font-bold text-lg text-[#898989]'>Transferencia electrónica</span>
        <span className='text-[#27316e] italic font-black'>Banco: <span className='text-[#27316e] italic font-normal'>Scotiabank México</span></span>
        <span className='text-[#27316e] italic font-black'>Cuenta: <span className='text-[#27316e] italic font-normal'>11700405566</span></span>
        <span className='text-[#27316e] italic font-black'>Clabe: <span className='text-[#27316e] italic font-normal'>044744117004055664</span></span>
        <span className='text-[#27316e] italic font-black'>Concepto: <span className='text-[#27316e] italic font-normal'>(tu matrícula)</span></span>
      </div>
    </main>
  )
}
