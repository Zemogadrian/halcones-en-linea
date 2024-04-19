import { Enums, TablesInsert } from 'database.types'

export interface Config<
  AT extends Enums<'activity_type'>
> extends Omit<TablesInsert<'activities'>, 'id' | 'created_at' | 'type' | 'professor'> {
  type: AT
}

export type Response = Omit<TablesInsert<'responses'>, 'id' | 'created_at' | 'question'>

export interface Question<
  QT extends Enums<'question_type'>
> extends Omit<TablesInsert<'questions'>, 'id' | 'created_at' | 'type' | 'activity'> {
  type: QT
  responses: QT extends 'multiple_option' ? Response[] : null
}

export interface CreateActivityProps<
  AT extends Enums<'activity_type'>,
  QT extends Enums<'question_type'>
> {
  config: Config<AT>
  questions: AT extends 'work' ? null : Array<Question<QT>>
  files: AT extends 'work' ? Array<{ bytes: string, name: string }> : null
}

export interface GetMyActivitiesProps {
  careerId: number
  semesterId: number
  groupId: number
  subjectId: number
  educationPlanId: number
}

export interface StartClassProps {
  groupId: number
  semesterId: number
  subjectId: number
  educationPlanId: number
  careerId: number
  subjectSlug: string
}
