'use client'
import { useState } from 'react'

export default function StudentNavBar () {
  const [selected, setSelected] = useState('')

  const CalAnimation = ({ children, isSelected }) => {
    return (
      <button
        className={` h-full hover:bg-itesus-blue-default hover:text-white  ${isSelected ? 'bg-blue-600 text-white' : ''}`}
      >
        {children}
      </button>
    )
  }

  console.log(selected)
  return (
    <div className=' flex flex-row h-16 select-none bg-[#42434565] justify-around'>
      <div className='items-center justify-center flex gap-2'>
        <button onClick={() => setSelected('Lunes')} className={`${selected === 'Lunes' ? 'text-[#808080] bg-[#fff] ' : 'text-[#fff] bg-[#808080] '}] text-xl font-bold rounded-full  w-10 h-10 bg-[#808080]  `}>L</button>
        <button onClick={() => setSelected('Martes')} className={`${selected === 'Martes' ? 'text-[#808080] bg-[#fff] ' : 'text-[#fff] bg-[#808080] '}] text-xl font-bold rounded-full  w-10 h-10 bg-[#808080]  `}>M</button>
        <button onClick={() => setSelected('Miercoles')} className={`${selected === 'Miercoles' ? 'text-[#808080] bg-[#fff] ' : 'text-[#fff] bg-[#808080] '}] text-xl font-bold rounded-full  w-10 h-10 bg-[#808080]  `}>M</button>
        <button onClick={() => setSelected('Jueves')} className={`${selected === 'Jueves' ? 'text-[#808080] bg-[#fff] ' : 'text-[#fff] bg-[#808080] '}] text-xl font-bold rounded-full  w-10 h-10 bg-[#808080]  `}>J</button>
        <button onClick={() => setSelected('Viernes')} className={`${selected === 'Viernes' ? 'text-[#808080] bg-[#fff] ' : 'text-[#fff] bg-[#808080] '}] text-xl font-bold rounded-full  w-10 h-10 bg-[#808080]  `}>V</button>
      </div>
      <div className='flex text-xl text-white h-full justify-center'>
        <div className='flex flex-row w-full h-full justify-center'>
          <div className=''>
            <CalAnimation link='/maestros/actividades/crearactividades'>
              <p className='hover:-translate-y-1.5 duration-300 border-r-2 border-r-[#27316e] px-2 text-[#27316e]'>Temas</p>
            </CalAnimation>
          </div>
          <div className=''>
            <CalAnimation>
              <p className='hover:-translate-y-1.5 duration-300 border-r-2 border-r-[#27316e] px-2 text-[#27316e]'>Documentación</p>
            </CalAnimation>
          </div>
          <div className=''>
            <CalAnimation>
              <p className='hover:-translate-y-1.5 duration-300 border-r-2 border-r-[#27316e] px-2 text-[#27316e]'>Actividades</p>
            </CalAnimation>
          </div>
          <div className=''>
            <CalAnimation>
              <p className='hover:-translate-y-1.5 duration-300 border-r-2 border-r-[#27316e] px-2 text-[#27316e]'>Examen</p>
            </CalAnimation>
          </div>
          <div className=''>
            <CalAnimation>
              <p className='hover:-translate-y-1.5 duration-300 px-2 text-[#27316e]'>Clases grabadas</p>
            </CalAnimation>
          </div>
        </div>
      </div>
      <div className='flex items-center'>
        <button className='text-white font-semibold mr-4'>Alumno</button>
      </div>
    </div>
  )
}
