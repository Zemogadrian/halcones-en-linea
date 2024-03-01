import * as React from 'react'
import { SVGProps } from 'react'

export const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    id='Capa_1'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 14.15 7.84'
    {...props}
  >
    <polygon points='0 .57 14.15 .57 7.08 7.64 0 .57' />
  </svg>
)

export const SquareIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    id='Capa_1'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    viewBox='0 0 7.62 7.62'
    {...props}
  >
    <defs>
      <style>
        {'.cls-1{fill:url(#Degradado_sin_nombre_3);stroke-width:0px;}'}
      </style>
      <linearGradient
        id='Degradado_sin_nombre_3'
        x1={0}
        y1={3.81}
        x2={7.62}
        y2={3.81}
        gradientUnits='userSpaceOnUse'
      >
        <stop offset={0} stopColor='#294786' />
        <stop offset={0.24} stopColor='#263f78' />
        <stop offset={0.69} stopColor='#202a55' />
        <stop offset={1} stopColor='#1b1a39' />
      </linearGradient>
    </defs>
    <rect className='cls-1' x={0} y={0} width={7.62} height={7.62} />
  </svg>
)
