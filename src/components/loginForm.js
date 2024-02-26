import { useLocation } from 'react-router'
import background from '../../img/Imagen2.jpg'

export default function Inicio ({ children }) {
  const { pathname } = useLocation()

  return (
    <>
      {pathname === '/login'
        ? children
        : (
          <div className='w-screen h-screen overflow-hidden flex flex-col p-2' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
            <div className='flex h-full w-full  overflow-x-visible'>
              <div className=' h-full 2xl:w-2/12 xl:w-3/12 lg:w-4/12 md:w-5/12 sm:w-6/12 portrait:w-7/12 portrait:fixed flex flex-col items-center py-5 px-2 gap-4 overflow-x-visible '>
                <div className='w-full h-40 flex justify-center items-center  py-6 px-10' />
              </div>
              <div className='flex flex-col w-10/12  gap-4 py-5 px-4 ml-auto'>
                <div className='w-full flex flex-col  justify-center items-center ' />
              </div>
            </div>
          </div>
          )}
    </>
  )
}
