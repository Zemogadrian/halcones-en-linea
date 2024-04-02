// import { createClient } from '../../actions'

// export const getWorkInfo = async (slug: string) => {
//   const supabase = await createClient()

//   const safeSlug = decodeURIComponent(slug)

//   const { data, error } = await supabase
//     .from('teacher_config')
//     .select('group, subject, semester, plan_edu, career ')
//     .eq('id', safeSlug)
//     .single()

//   if (error != null) {
//     console.error('Error getting career:', error)
//     throw new Error('Error getting career')
//   }

//   return data
// }

// config: {
//     type: 'work',
//     career: career.id,
//     subject: 0,
//     deadline: new Date(searchParams.get('activitydeadline') ?? '').toISOString(),
//     desc: searchParams.get('activitydescription') ?? '',
//     education_plan: 0,
//     group: 0,
//     name: searchParams.get('activityname') ?? '',
//     semester: 0
//   },
//   questions: null,
//   files: []
