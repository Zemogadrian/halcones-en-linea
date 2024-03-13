import { Tables } from 'database.types'
import { z } from 'zod'
import { EducationPlan } from '../types'

interface SemesterExtracted {
  semester: string
  subjects: Array<{
    created_at: string
    id: number
    name: string
  } | undefined>
}

export const extractSemesters = (subjects: Array<Tables<'subjects'>>, entries: {
  [k: string]: FormDataEntryValue
}) => {
  const [,...semesters] = Object.entries(entries).map(([key, value]) => {
    if (key.startsWith('subjects-')) {
      const newValue = z.coerce.string().parse(value)

      return {
        semester: key.split('-')[1],
        subjects: newValue.split(',').map((subjectName) => subjects.find((subject) => subject.name === subjectName))
      }
    }

    return null
  }).filter((value) => value != null)

  return semesters
}

export const filterSemestersToDelete = (semesters: Array<SemesterExtracted | null>, oldPlan: EducationPlan) => oldPlan.semesters.filter((semester) => {
  return !semesters.some((newSemester) => newSemester?.semester === semester.number.toString())
})

export const filterSemestersToUpdate = (semesters: Array<SemesterExtracted | null>, oldPlan: EducationPlan) => semesters.filter((semester) => {
  return oldPlan.semesters.some((oldSemester) => oldSemester.number.toString() === semester?.semester)
})

export const filterSubjectsToDelete = (oldPlan: EducationPlan, semester: SemesterExtracted) => oldPlan.semesters.find((oldSemester) => oldSemester.number.toString() === semester.semester)?.semester_subjects.filter((ss) => {
  return !semester.subjects.some((subject) => subject?.name === ss.subjects?.name)
})

export const filterSubjectsToAdd = (semester: SemesterExtracted, oldPlan: EducationPlan) => semester.subjects.filter((subject) => {
  const edu = oldPlan.semesters.find((oldSemester) => oldSemester.number.toString() === semester.semester)

  if (edu == null) return []

  return !edu.semester_subjects.some((ss) => ss?.subjects?.name === subject?.name)
})

export const filterSemestersToAdd = (semesters: Array <SemesterExtracted | null >, oldPlan: EducationPlan) => semesters.filter((semester) => {
  return !oldPlan.semesters.some((oldSemester) => oldSemester.number.toString() === semester?.semester)
})
