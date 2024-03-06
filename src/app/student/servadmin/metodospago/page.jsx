export default function MetodosPago () {
  return (
    <main className='flex flex-row justify-center overflow-hidden gap-14 w-full'>
      <div className=' rounded-2xl px-10 p-4 bg-[#cdcbcc]  flex flex-col'>
        <span className='font-bold text-lg underline  text-[#898989]'>Efectivo</span>
        <span className='text-[#27316e]'>Pagos directamente en la institución</span>
      </div>
      <div className=' rounded-2xl px-10 p-4 bg-[#cdcbcc] flex flex-col'>
        <span className=' font-bold text-lg text-[#898989]'>Transferencia electrónica</span>
        <span className='text-[#27316e] italic '>Banco: Scotiabank México</span>
        <span className='text-[#27316e] italic'>Cuenta: 11700405566</span>
        <span className='text-[#27316e] italic'>Clabe: 044744117004055664</span>
        <span className='text-[#27316e] italic'>Concepto: (tu matrícula)</span>
      </div>
    </main>
  )
}
