import { z } from 'zod'

export const SubjectScheme = z.object({
  id: z.number(),
  name: z.string()
})

export const SubjectWithCreatedDate = SubjectScheme.extend({
  created_at: z.string(),
  slug: z.string()
})

export interface IsClassOnlineProps {
  carrerId: number
  educationPlanId: number
  groupId: number
  semesterId: number
}
