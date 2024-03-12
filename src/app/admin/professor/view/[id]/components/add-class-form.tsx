'use client'
import { H1 } from '@/components/utils'
import { getEducationPlans } from '@/services/supabase/actions'
import { EducationPlan } from '@/services/supabase/types'
import { v4 } from '@/utils/uuid'
import { useEffect, useState } from 'react'

export const AddClassForm = () => {
  const [plans, setPlans] = useState<EducationPlan[]>([])

  useEffect(() => {
    getEducationPlans()
      .then(plans => {
        setPlans(plans)
      })
      .catch(console.error)
  }, [])

  return (
    <form>
      <H1 className='text-black/80'>
        Agregar clase
      </H1>

      <select>
        {plans.map((plan) => (
          <option
            key={v4()}
            value={plan.id}
          >
            {plan.name}
          </option>
        ))}
      </select>

    </form>
  )
}
