'use client'

// import { useState } from 'react'
import { DisplayOptions } from '../../components/display-options'
import { AnimatedDisplay } from '../../components/animated-display'
import { AssignActName } from './assign-act-name'
import { DescribeAct } from './describe-act'
import { DeadlineAct } from './deadline'

export const OptionsSection = () => {
//   const [options] = useState([])

  return (
    <DisplayOptions>
      <AnimatedDisplay position={1}>
        <AssignActName />
      </AnimatedDisplay>
      <AnimatedDisplay position={2}>
        <DescribeAct />
      </AnimatedDisplay>
      <AnimatedDisplay position={3}>
        <DeadlineAct />
      </AnimatedDisplay>

      {/* {options.map((Option, index) => (
        <AnimatedDisplay key={index} position={index + 1}>
          <Option />
        </AnimatedDisplay>
      ))} */}
    </DisplayOptions>
  )
}
