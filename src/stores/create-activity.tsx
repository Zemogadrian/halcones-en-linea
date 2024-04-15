import { CreateActivityProps, Question } from '@/services/supabase/actions/professor.types'
import { Enums } from 'database.types'
import { create } from 'zustand'

interface CreateActivityStore<
QT extends Enums<'question_type'>,
AT extends Enums<'activity_type'>
> extends CreateActivityProps<AT, QT> {
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
    type: 'work',
    is_open: false
  },
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
  addFile: (file) => set((state) => ({ files: [...(state.files ?? []), file] }))
}))
