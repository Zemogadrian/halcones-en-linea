import { Question } from '@/services/supabase/actions/professor.types'
import { Enums } from 'database.types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface QuestionStore {
  questions: {
    [key: number]: Question<Enums<'question_type'>>
  }

  getQuestion: (index: number) => Question<Enums<'question_type'>>

  setQuestion: (index: number, question: Question<Enums<'question_type'>>) => void
}

export const useQuestionsStore = create(devtools<QuestionStore>((set, get) => ({
  questions: {},
  getQuestion: (index) => {
    const question = get().questions[index]

    if (question == null) {
      return {
        accept_file: false,
        question: '',
        type: 'multiple_option',
        responses: []
      }
    }

    return question
  },
  setQuestion: (index, question) => set((state) => ({ questions: { ...state.questions, [index]: question } }))
})))
