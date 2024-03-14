'use client'

import { Form, H1, LabeledSelect, SubmitButton } from '@/components/utils'
import { v4 } from '@/utils/uuid'
import { useAddSubjects } from '../hooks/use-add-subjects'
import { assingProfessorToSubject } from '@/services/supabase/actions'

interface Props {
  onCreate: () => void
  professorId: string
}

export const AddClassForm = ({ onCreate, professorId }: Props) => {
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
    subjects,
    selectedGroup,
    selectedSubject,
    setSelectedGroup,
    setSelectedSubject
  } = useAddSubjects()

  return (
    <Form action={assingProfessorToSubject}>
      <input name='professor' className='hidden' value={professorId} />

      <H1 className='text-white mb-4'>
        Agregar clase
      </H1>

      <LabeledSelect
        required
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
        required
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
        required
        label='Grupo'
        name='group'
        value={selectedGroup ?? undefined}
        onChange={e => setSelectedGroup(Number(e.target.value))}
      >
        {groups.map(group => (
          <option key={v4()} value={group.id}>{group.name}</option>
        ))}
      </LabeledSelect>

      <LabeledSelect
        required
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
        required
        label='Materia'
        name='subject'
        value={selectedSubject ?? undefined}
        onChange={e => setSelectedSubject(Number(e.target.value))}
      >
        {subjects.map(subject => (
          <option key={v4()} value={subject.id}>{subject.name}</option>
        ))}
      </LabeledSelect>

      <SubmitButton
        onClick={onCreate}
      >
        Agregar
      </SubmitButton>

    </Form>
  )
}
