import { getEducationPlansByCareer, getGroupsByCareer, getReducedCareers, getSubjectsBySemester } from '@/services/supabase/actions'
import { EducationPlanByCareer, GroupByCareer, ReducedCareer } from '@/services/supabase/types'
import { Tables } from 'database.types'
import { useEffect, useState } from 'react'

export const useAddSubjects = () => {
  const [careers, setCareers] = useState<ReducedCareer[]>([])
  const [selectedCareer, setSelectedCareer] = useState<ReducedCareer | null>(null)

  const [groups, setGroups] = useState<GroupByCareer[]>([])

  const [educationPlans, setEducationPlans] = useState<EducationPlanByCareer[]>([])
  const [selectedEducationPlan, setSelectedEducationPlan] = useState<EducationPlanByCareer | null>(null)

  const [subjects, setSubjects] = useState<Array<Tables<'subjects'>>>([])

  const [semester, setSemester] = useState<{
    id: number
    number: number
  } | null>(null)

  const changeCareer = async (careerId: number) => {
    const groups = await getGroupsByCareer(careerId)
    const educationPlans = await getEducationPlansByCareer(careerId)

    setGroups(groups)
    setEducationPlans(educationPlans)

    setSelectedEducationPlan(educationPlans[0])

    setSemester(educationPlans[0].semesters[0])

    const subjects = await getSubjectsBySemester(educationPlans[0].semesters[0].id)

    setSubjects(subjects)
  }

  const changeEducationPlan = async (educationPlanId: number) => {
    const semester = educationPlans.find(plan => plan.id === educationPlanId)?.semesters[0]

    if (semester == null) return

    setSemester(semester)

    const subjects = await getSubjectsBySemester(semester.id)

    setSubjects(subjects)
  }

  const changeSemester = async (semesterId: number) => {
    const subjects = await getSubjectsBySemester(semesterId)

    setSubjects(subjects)
  }

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
          })
          .catch(console.error)
      })
      .catch(console.error)
  }, [])

  return {
    careers,
    selectedCareer,
    groups,
    educationPlans,
    selectedEducationPlan,
    subjects,
    semester,
    changeCareer,
    changeEducationPlan,
    changeSemester
  }
}
