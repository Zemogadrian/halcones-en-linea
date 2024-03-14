'use client'

import { Form, H1, LabeledSelect, SubmitButton } from '@/components/utils'
import { v4 } from '@/utils/uuid'
import { useAddSubjects } from '../hooks/use-add-subjects'
import { assingProfessorToSubject } from '@/services/supabase/actions'

export const AddClassForm = () => {
  const {
    careers,
    selectedCareer,
    changeCareer,
    changeEducationPlan,
    changeSemester,
    educationPlans,
    groups,
    selectedEducationPlan,
    semester,
    subjects
  } = useAddSubjects()

  return (
    <Form action={assingProfessorToSubject}>
      <H1 className='text-white mb-4'>
        Agregar clase
      </H1>

      <LabeledSelect
        name='career'
        label='Carrera'
        value={selectedCareer?.id}
        onChange={e => {
          changeCareer(Number(e.target.value))
            .catch(console.error)
        }}
      >
        {careers.map(career => (
          <option key={v4()} value={career.id}>{career.name}</option>
        ))}
      </LabeledSelect>

      <LabeledSelect
        name='educationPlan'
        label='Plan de estudios'
        value={selectedEducationPlan?.id}
        onChange={e => {
          changeEducationPlan(Number(e.target.value))
            .catch(console.error)
        }}
      >
        {educationPlans.map(plan => (
          <option key={v4()} value={plan.id}>{plan.name}</option>
        ))}
      </LabeledSelect>

      <LabeledSelect
        label='Grupo'
        name='group'
      >
        {groups.map(group => (
          <option key={v4()} value={group.id}>{group.name}</option>
        ))}
      </LabeledSelect>

      <LabeledSelect
        label='Semestre'
        name='semester'
        value={semester?.id}
        onChange={e => {
          changeSemester(Number(e.target.value))
            .catch(console.error)
        }}
      >
        {selectedEducationPlan?.semesters.map(semester => (
          <option key={v4()} value={semester.id}>{semester.number}</option>
        ))}
      </LabeledSelect>

      <LabeledSelect
        label='Materia'
        name='subject'
      >
        {subjects.map(subject => (
          <option key={v4()} value={subject.id}>{subject.name}</option>
        ))}
      </LabeledSelect>

      <SubmitButton>
        Agregar
      </SubmitButton>

    </Form>
  )
}
