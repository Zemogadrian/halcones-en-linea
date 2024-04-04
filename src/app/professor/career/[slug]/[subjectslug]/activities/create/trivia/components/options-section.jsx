import { AnimatedDisplay } from '../../components/animated-display'
import { DisplayOptions } from '../../components/display-options'
import { AssignTrivName } from './assign-name'
import { CreateTrivQuestion } from './create-question'

export const OptionsSection = () => {
  //   const [options] = useState([])

  return (
    <>
      <DisplayOptions>
        <AnimatedDisplay position={1}>
          <AssignTrivName />
        </AnimatedDisplay>
        <AnimatedDisplay position={2}>
          <CreateTrivQuestion />
        </AnimatedDisplay>
      </DisplayOptions>
      <button className='bg-[#1a62a6] text-white px-4 py-1 rounded-md'>
        Asignar actividad
      </button>
    </>
  )
}
