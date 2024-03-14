'use client'

import { Form, H1, LabeledSelect } from '@/components/utils'
import { getEducationPlansByCareer, getGroupsByCareer, getReducedCareers, getSubjectsBySemester } from '@/services/supabase/actions'
import { EducationPlanByCareer, GroupByCareer, ReducedCareer } from '@/services/supabase/types'
import { v4 } from '@/utils/uuid'
import { Tables } from 'database.types'
import { useEffect, useState } from 'react'

const changeCareer = async (
  career: ReducedCareer
) => {
  const groups = await getGroupsByCareer(career.id)
  const educationPlans = await getEducationPlansByCareer(career.id)

  return {
    groups,
    educationPlans
  }
}

export const AddClassForm = () => {
  const [careers, setCareers] = useState<ReducedCareer[]>([])
  const [selectedCareer, setSelectedCareer] = useState<ReducedCareer | null>(null)

  const [groups, setGroups] = useState<GroupByCareer[]>([])
  const [selectedGroup, setSelectedGroup] = useState<GroupByCareer | null>(null)

  const [educationPlans, setEducationPlans] = useState<EducationPlanByCareer[]>([])
  const [selectedEducationPlan, setSelectedEducationPlan] = useState<EducationPlanByCareer | null>(null)

  const [subjects, setSubjects] = useState<Array<Tables<'subjects'>>>([])

  const [semester, setSemester] = useState<{
    id: number
    number: number
  } | null>(null)

  useEffect(() => {
    getReducedCareers()
      .then(careers => {
        setCareers(careers)
        setSelectedCareer(careers[0])

        getEducationPlansByCareer(careers[0].id)
          .then(plans => {
            setEducationPlans(plans)
            setSelectedEducationPlan(plans[0])

            setSemester(plans[0].semesters[0])

            getSubjectsBySemester(plans[0].semesters[0].id)
              .then(setSubjects)
              .catch(console.error)
          })
          .catch(console.error)

        getGroupsByCareer(careers[0].id)
          .then(groups => {
            setGroups(groups)
            setSelectedGroup(groups[0])
          })
          .catch(console.error)
      })
      .catch(console.error)
  }, [])

  return (
    <Form>
      <H1 className='text-white mb-4'>
        Agregar clase
      </H1>

      <LabeledSelect
        label='Carrera'
        value={selectedCareer?.id}
        onChange={e => {
          const career = careers.find(career => career.id.toString() === e.target.value)

          if (career == null) return

          setSelectedCareer(career)

          changeCareer(career)
            .then(({ groups, educationPlans }) => {
              setGroups(groups)
              setSelectedGroup(groups[0])

              setEducationPlans(educationPlans)
              setSelectedEducationPlan(educationPlans[0])

              setSemester(educationPlans[0].semesters[0])

              getSubjectsBySemester(educationPlans[0].semesters[0].id)
                .then(setSubjects)
                .catch(console.error)
            })
            .catch(console.error)
        }}
      >
        {careers.map(career => (
          <option key={v4()} value={career.id}>{career.name}</option>
        ))}
      </LabeledSelect>

      <LabeledSelect
        label='Plan de estudios'
        value={selectedEducationPlan?.id}
        onChange={e => {
          const plan = educationPlans.find(plan => plan.id.toString() === e.target.value)

          if (plan == null) return

          setSelectedEducationPlan(plan)

          setSemester(plan.semesters[0])

          getSubjectsBySemester(plan.semesters[0].id)
            .then(setSubjects)
            .catch(console.error)
        }}
      >
        {educationPlans.map(plan => (
          <option key={v4()} value={plan.id}>{plan.name}</option>
        ))}
      </LabeledSelect>

      <LabeledSelect
        label='Grupo'
        value={selectedGroup?.id}
        onChange={e => {
          const group = groups.find(group => group.id.toString() === e.target.value)

          if (group == null) return

          setSelectedGroup(group)
        }}
      >
        {groups.map(group => (
          <option key={v4()} value={group.id}>{group.name}</option>
        ))}
      </LabeledSelect>

      <LabeledSelect
        label='Semestre'
        value={semester?.id}
        onChange={e => {
          const semester = selectedEducationPlan?.semesters.find(semester => semester.id.toString() === e.target.value)

          if (semester == null) return

          setSemester(semester)

          getSubjectsBySemester(semester.id)
            .then(setSubjects)
            .catch(console.error)
        }}
      >
        {selectedEducationPlan?.semesters.map(semester => (
          <option key={v4()} value={semester.id}>{semester.number}</option>
        ))}
      </LabeledSelect>

      <LabeledSelect
        label='Materia'
      >
        {subjects.map(subject => (
          <option key={v4()} value={subject.id}>{subject.name}</option>
        ))}
      </LabeledSelect>

    </Form>
  )
}
