import { Enums, Tables } from 'database.types'

interface Config<AT extends Enums<'activity_type'>> extends Omit<Tables<'activities'>, 'id' | 'created_at' | 'type'> {
  type: AT
}

interface Question<QT extends Enums<'question_type'>> extends Omit<Tables<'questions'>, 'id' | 'created_at' | 'type' | 'activity'> {
  type: QT
  responses: QT extends 'multiple_option' ? Array<Tables<'multiple_options_responses'>> : null
}

export interface CreateActivityProps<AT extends Enums<'activity_type'>, QT extends Enums<'question_type'>> {
  config: Config<AT>
  questions: AT extends 'work' ? null : Array<Question<QT>>
}
