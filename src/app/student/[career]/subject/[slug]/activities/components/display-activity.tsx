import { dateTimeFormatter } from '@/utils/formatters'
import { IconCheck, IconFileUpload } from '@tabler/icons-react'

interface Props {
  number: number
  topic: string
  deadline: Date
  description?: string
  status: string
  checked?: boolean
  requiredFile?: boolean
  qualification?: number
  type: {
    label: string
    value: string
  }
}

export const DisplayActivity = ({ number, topic, deadline, description, status, checked = false, requiredFile = false, qualification, type }: Props) => {
  return (
    <article>

      <header className='flex text-white bg-[#309c37] rounded-md overflow-hidden mb-3'>
        <div
          className='flex-1 bg-itesus-tertiary text-itesus-primary text-xl flex items-center px-3'
        >
          <span>Actividad {number}</span>
        </div>

        {
            requiredFile && (
              <div
                className='bg-[#808080] px-3 py-1 flex items-center justify-center rounded-r-lg'
              >
                <IconFileUpload size={24} />
              </div>
            )
        }

        {
            checked && (
              <div
                className='px-3 py-1 flex items-center justify-center'
              >
                <IconCheck size={24} />
              </div>
            )
        }
      </header>

      <section>
        <h1
          className='text-itesus-tertiary text-2xl'
        >
          Tema: {topic}
        </h1>

        <ul
          className='list-disc text-itesus-tertiary text-xl px-5'
        >
          <li>Fecha de entrega: {dateTimeFormatter(deadline, 'es-MX')}</li>

          <li>
            Tipo de actividad: {type.label}
          </li>

          {description != null && (
            <li>
              Instrucciones de la actividad: {description}
            </li>
          )}
          <li>
            Status: {status}
          </li>

          <li>
            Calificacion: {
                qualification != null
                  ? qualification
                  : 'No calificada'
            }
          </li>
        </ul>
      </section>

    </article>
  )
}
