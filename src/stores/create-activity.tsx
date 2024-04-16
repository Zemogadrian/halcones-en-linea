import { Config, CreateActivityProps, Question } from '@/services/supabase/actions/professor.types'
import { Enums } from 'database.types'
import { create } from 'zustand'

interface NewConfig<AT extends Enums<'activity_type'>> extends Omit<Config<AT>, 'type'> {
  type?: AT
}

interface CreateActivityStore<
QT extends Enums<'question_type'>,
AT extends Enums<'activity_type'>
> extends Omit<CreateActivityProps<AT, QT>, 'config'> {
  section: string
  setSection: (section: string) => void
  config: NewConfig<AT>
  setName: (name: string) => void
  addQuestion: (question: Question<QT>) => void
  setCareer: (career: number) => void
  setSubject: (subject: number) => void
  setGroup: (group: number) => void
  setDeadline: (deadline: string) => void
  setDesc: (desc: string) => void
  setEducationPlan: (educationPlan: number) => void
  setSemester: (semester: number) => void
  setType: (type: AT) => void
  setIsOpen: (isOpen: boolean) => void
  addFile: (file: File) => void
  setQuestionsQuantity: (quantity: number) => void
}

export const createActivityStore = create<CreateActivityStore<Enums<'question_type'>, Enums<'activity_type'>>>((set) => ({
  config: {
    name: '',
    career: 0,
    subject: 0,
    group: 0,
    deadline: new Date().toISOString(),
    desc: '',
    education_plan: 0,
    semester: 0,
    is_open: false
  },
  section: 'activity-type',
  files: [],
  questions: [],
  setName: (name) => set((state) => ({ config: { ...state.config, name } })),
  addQuestion: (question) => set((state) => ({ questions: [...(state.questions ?? []), question] })),
  setCareer: (career) => set((state) => ({ config: { ...state.config, career } })),
  setDeadline: (deadline) => set((state) => ({ config: { ...state.config, deadline } })),
  setDesc: (desc) => set((state) => ({ config: { ...state.config, desc } })),
  setEducationPlan: (educationPlan) => set((state) => ({ config: { ...state.config, education_plan: educationPlan } })),
  setGroup: (group) => set((state) => ({ config: { ...state.config, group } })),
  setIsOpen: (isOpen) => set((state) => ({ config: { ...state.config, is_open: isOpen } })),
  setSemester: (semester) => set((state) => ({ config: { ...state.config, semester } })),
  setSubject: (subject) => set((state) => ({ config: { ...state.config, subject } })),
  setType: (type) => set((state) => ({ config: { ...state.config, type } })),
  addFile: (file) => set((state) => ({ files: [...(state.files ?? []), file] })),
  setSection: (section) => set({ section }),
  setQuestionsQuantity: (quantity) => set(state => ({
    ...state,
    questions: new Array(quantity).fill({
      accept_file: false,
      question: '',
      type: 'multiple_option',
      responses: []
    })
  }))
}))
