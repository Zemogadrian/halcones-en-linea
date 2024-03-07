export default function Exams () {
  return (
    <main className='flex flex-col h-full w-full items-center gap-14'>
      <div className='flex flex-row  justify-between text-white gap-4 w-[60rem]'>
        <div className='flex flex-col'>
          <h1 className='underline'>Examen 2do Parcial</h1>
          <p>En este examen verás los temas abordados en clase, desde finanzas hasta registro de marca</p>
        </div>
        <div className='flex flex-col gap-5 '>
          <button className='bg-[#373d57] rounded-full px-14 py-1 italic'>
            <p>Iniciar Examen</p>
          </button>
          <button className='bg-[#838196] rounded-full px-14 py-1 italic'>
            <p>Salir del Examen</p>
          </button>
        </div>
      </div>
      <div className='flex flex-col items-center gap-20 text-[#cfcbcc] w-[60rem]'>
        <span className='underline text-white text-2xl font-black'>REGLAMENTO</span>
        <span className='text-justify text-xl'>
          Queda estrictamente prohibido el plagio de información en cualquier contexto. Toda investigación o evaluación que se realice deberá ser original y basada en fuentes adecuadas y debidamente citadas. El plagio, entendido como la apropiación indebida de ideas, palabras o trabajos de otras personas sin el debido reconocimiento, es una falta grave contra la integridad académica y profesional. Cualquier forma de copia o reproducción no autorizada será sujeta a medidas disciplinarias o legales, según corresponda. Se promueve el respeto por la propiedad intelectual y la ética en el manejo de información en todas las actividades de investigación, estudio o trabajo.
        </span>
        <span>Para la realización de esta evaluación tendrás <span>3</span> intentos y un tiempo de <span>45</span> minutos a partir de que comience el examen</span>
        <div className='gap-2 flex'>
          <input type='checkbox' />
          <label>He leído y acepto el reglamento</label>
        </div>
      </div>
    </main>
  )
}
