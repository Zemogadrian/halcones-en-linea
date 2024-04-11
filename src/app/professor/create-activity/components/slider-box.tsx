'use client'

// import { InteractiveBox } from './box'

export const SliderBox = () => {
  return (
    <section className='flex justify-center items-center flex-1 gap-5'>
      <button>
        Izquierda
      </button>
      <div
        className='h-72 aspect-[16/9] relative'
      >
        {/* <InteractiveBox options={[
          {
            type: 'input',
            placeholder: 'Nombre de la actividad'
          },
          {
            type: 'button',
            placeholder: 'Crear actividad'
          },
          {
            type: 'select',
            options: [
              {
                value: '1',
                label: 'Trivia'
              },
              {
                value: '2',
                label: 'Examen'
              }
            ]
          }
        ]}
        /> */}
      </div>
      <button>
        Derecha
      </button>
    </section>
  )
}
