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

export const BooksIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='icon icon-tabler icon-tabler-books'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z' />
    <path d='M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z' />
    <path d='M5 8h4' />
    <path d='M9 16h4' />
    <path d='M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z' />
    <path d='M14 9l4 -1' />
    <path d='M16 16l3.923 -.98' />
  </svg>
)
