import { Enums } from 'database.types'
import { Option } from './components/box'

type ACTIVITIESTYPE = {
  [K in Enums<'activity_type'>]: {
    name: string
    requestOptions?: {
      [key: number | string]: {
        name: string
        elements: Option[]
      }
    }
    queryParams?: string[]
    pageInfo?: {
      title: string
      description: string
    }
  }
}

export const ACTIVITIES: ACTIVITIESTYPE = {
  exam: {
    name: 'Examen'
  },
  questionary: {
    name: 'Cuestionario'
  },
  trivia: {
    name: 'Trivia',
    pageInfo: {
      title: 'Arma tu trivia',
      description: 'Sigue las instrucciones en cada apartado para completar y asignar la trivia a tus alumnos correctamente.'
    },
    requestOptions: {
      1: {
        name: 'Nombre de la trivia',
        elements: [
          {
            type: 'input',
            placeholder: 'Escribe el nombre de la trivia',
            onlyElement: true,
            onChange ({ event, state }) {
              state.setStore(prev => ({
                ...prev,
                name: event.target.value
              }))
            }
          }
        ]
      },
      '2-infinity': {
        name: 'Preguntas',
        elements: [
          {
            type: 'input',
            onChange ({ event, state }) {
              state.setStore(prev => ({
                ...prev,
                questions: {
                  [event.target.value]: {}
                }
              }))
            }
          }
        ]
      }
    },
    queryParams: ['name', 'questions', 'actual-question']
  },
  work: {
    name: 'Trabajo'
  }
}
