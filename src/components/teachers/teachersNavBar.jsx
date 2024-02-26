export default function TeacherNavBar () {
  return (
    <div>
      <nav className='bg-[#7f8fac65] flex justify-between items-center h-16'>
        <div className='flex items-center'>
          <h1 className='text-white text-2xl font-bold ml-4'>Teacher</h1>
        </div>
        <div className='flex items-center'>
          <button className='text-white font-semibold mr-4'>Cerrar sesión</button>
        </div>
      </nav>
    </div>
  )
}
