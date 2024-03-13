import { QueryData } from '@supabase/supabase-js'
import { supabase } from './client'

const educationPlan = supabase.from('education_plans').select('*, semesters(*, semester_subjects(subjects(*)))').single()

export type EducationPlan = QueryData<typeof educationPlan>

const reducedCareer = supabase.from('careers').select('id, name, campus(id, name)').single()

export type ReducedCareer = QueryData<typeof reducedCareer>
