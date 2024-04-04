'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import '../../../../../../styles/custom.css'

function Maestro () {
  return (
    <div className='maestro bg-green-200 p-2 rounded-xl justify-end flex self-end max-w-96'>
      Hola alumnogap-10
      Hola alumnogap-10
      Hola alumnogap-10
      Hola alumnogap-10
      Hola alumnogap-10
      Hola alumnogap-10
      Hola alumnogap-10
      Hola alumnogap-10
      Hola alumnogap-10
    </div>
  )
}

function Alumno () {
  return (
    <div className='alumno bg-white p-2 rounded-xl max-w-96 flex flex-col justify-start self-start'>
      <span>
        Hola maestro
      </span>
      <span>
        Hola maestro
      </span>
    </div>
  )
}

function ScrollToBottomButton ({ scrollContainerRef }) {
  const [isVisible, setIsVisible] = useState(true)

  const checkScrollTop = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
    const isAtBottom = scrollTop >= scrollHeight - clientHeight - 10 // Increase the threshold to 10

    if (!isVisible && !isAtBottom) {
      setIsVisible(true)
    } else if (isVisible && isAtBottom) {
      setIsVisible(false)
    }
  }, [isVisible, scrollContainerRef])

  const scrollToBottom = () => {
    scrollContainerRef.current.scrollTo({ top: scrollContainerRef.current.scrollHeight, behavior: 'smooth' })
    checkScrollTop() // Check if the button should be hidden after scrolling to the bottom
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollTop)
      return () => scrollContainer.removeEventListener('scroll', checkScrollTop)
    }
  }, [checkScrollTop, scrollContainerRef])

  return (
    <button onClick={scrollToBottom} className={`fixed right-14 bottom-24 m-4 p-2 bg-blue-500 text-white rounded-full ${isVisible ? 'block' : 'hidden'}`}>
      <img src='/arrow.svg' alt='' className='w-10 h-10 ' />
    </button>
  )
}
export default function ForumsTeacher () {
  const scrollContainerRef = useRef(null)
  return (
    <main className='h-full w-full flex flex-col gap-10'>
      <div className='bg-[#305866] w-full h-20 items-center flex justify-center'>
        <h1 className='text-4xl font-bold text-center text-white '>Foros</h1>
      </div>
      <section ref={scrollContainerRef} className='flex flex-col  h-full items-center px-10 overflow-y-auto'>
        <Maestro />
        <Alumno />
        <Maestro />
        <Alumno />
        <Maestro />
        <Alumno />
        <Maestro />
        <Alumno />
        <Maestro />
        <Alumno />
        <Maestro />
        <Alumno />
      </section>
      <ScrollToBottomButton scrollContainerRef={scrollContainerRef} />
      <section className='w-full flex flex-row gap-4'>
        <input placeholder='Escribe un mensaje' className='w-full rounded-xl p-5' />
        <button title='Enviar'>
          <img src='/accept.svg' alt='' className='w-10 h-10' />
        </button>
      </section>
    </main>
  )
}
