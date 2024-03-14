import { getEducationPlansByCareer, getGroupsByCareer, getReducedCareers, getSubjectsBySemester } from '@/services/supabase/actions'
import { EducationPlanByCareer, GroupByCareer, ReducedCareer } from '@/services/supabase/types'
import { Tables } from 'database.types'
import { useEffect, useState } from 'react'

export const useAddSubjects = () => {
  const [careers, setCareers] = useState<ReducedCareer[]>([])
  const [selectedCareer, setSelectedCareer] = useState<ReducedCareer | null>(null)

  const [groups, setGroups] = useState<GroupByCareer[]>([])
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)

  const [educationPlans, setEducationPlans] = useState<EducationPlanByCareer[]>([])
  const [selectedEducationPlan, setSelectedEducationPlan] = useState<EducationPlanByCareer | null>(null)

  const [subjects, setSubjects] = useState<Array<Tables<'subjects'>>>([])
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null)

  const [semester, setSemester] = useState<{
    id: number
    number: number
  } | null>(null)

  const changeCareer = async (careerId: number) => {
    const career = careers.find(career => career.id === careerId)

    if (career == null) return

    setSelectedCareer(career)

    const groups = await getGroupsByCareer(careerId)
    const educationPlans = await getEducationPlansByCareer(careerId)

    setGroups(groups)
    setSelectedGroup(groups[0].id)

    setEducationPlans(educationPlans)

    setSelectedEducationPlan(educationPlans[0])

    setSemester(educationPlans[0].semesters[0])

    const subjects = await getSubjectsBySemester(educationPlans[0].semesters[0].id)

    setSubjects(subjects)
    setSelectedSubject(subjects[0].id)
  }

  const changeEducationPlan = async (educationPlanId: number) => {
    const educationPlan = educationPlans.find(plan => plan.id === educationPlanId)

    if (educationPlan == null) return

    setSelectedEducationPlan(educationPlan)

    const semester = educationPlan.semesters[0]

    if (semester == null) return

    setSemester(semester)

    const subjects = await getSubjectsBySemester(semester.id)

    setSubjects(subjects)
    setSelectedSubject(subjects[0].id)
  }

  const changeSemester = async (semesterId: number) => {
    const semester = selectedEducationPlan?.semesters.find(semester => semester.id === semesterId)

    if (semester == null) return

    setSemester(semester)

    const subjects = await getSubjectsBySemester(semesterId)

    setSubjects(subjects)
    setSelectedSubject(subjects[0].id)
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
              .then(subjects => {
                setSubjects(subjects)
                setSelectedSubject(subjects[0].id)
              })
              .catch(console.error)
          })
          .catch(console.error)

        getGroupsByCareer(careers[0].id)
          .then(groups => {
            setGroups(groups)
            setSelectedGroup(groups[0].id)
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
    changeSemester,
    selectedGroup,
    setSelectedGroup,
    selectedSubject,
    setSelectedSubject
  }
}
