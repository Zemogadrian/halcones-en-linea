import { QueryData } from '@supabase/supabase-js'
import { supabase } from './client'

const educationPlan = supabase.from('education_plans').select('*, semesters(*, semester_subjects(*, subject(*)))').single()

export type EducationPlan = QueryData<typeof educationPlan>
