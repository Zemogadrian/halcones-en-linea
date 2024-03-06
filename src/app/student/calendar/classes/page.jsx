import DisplayClass from '../../components/students/display-days'

export default function Classes () {
  return (
    <main className='gap-10 flex flex-col justify-center items-center'>
      <div className='flex flex-row gap-5 justify-center items-center'>
        <button>
          <img src='/arrow.svg' alt='leftArrow' className='rotate-90 w-6 h-6' />
        </button>
        <h1 className='text-white text-2xl'>Calendar</h1>
        <button>
          <img src='/arrow.svg' alt='leftArrow' className='-rotate-90 w-6 h-6' />
        </button>
      </div>
      <div className='grid grid-cols-2 grid-flow-row gap-20'>
        <DisplayClass />
      </div>
    </main>
  )
}
