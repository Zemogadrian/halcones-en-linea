import { AnimatedDisplay } from '../../components/animated-display'
import { DisplayOptions } from '../../components/display-options'

export const OptionsSection = () => {
  //   const [options] = useState([])

  return (
    <DisplayOptions>
      <AnimatedDisplay position={1}>
        <div className='options'>
          ª
        </div>
      </AnimatedDisplay>
    </DisplayOptions>
  )
}
