import DisplayClass from '../../components/students/display-days'

interface Props {
  params: {
    section: string
  }
}

export default async function SectionPage ({ params }: Props) {
  console.log(params)

  //   const getActions = {
  //     events: async () => {},
  //     subjects: async () => {},
  //     classes: async () => {},
  //     nonworkingdays: async () => {},
  //     evaluations: async () => {},
  //   }

  //   const action = await getActions[params.section]()

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
