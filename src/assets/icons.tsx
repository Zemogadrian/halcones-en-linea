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

export const UploadFileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    id='Capa_1'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 15.32 19.56'
    {...props}
  >
    <defs>
      <style>{'.cls-1{fill:#fff;stroke-width:0px;}'}</style>
    </defs>
    <g id='surface1'>
      <path
        className='cls-1'
        d='m10.41.3c-.09-.09-.21-.15-.34-.15H2.56c-1.39,0-2.53,1.14-2.53,2.53v14.21c0,1.39,1.14,2.53,2.53,2.53h10.2c1.39,0,2.53-1.14,2.53-2.53V5.6c0-.12-.06-.24-.13-.33L10.41.3Zm.13,1.49l3.18,3.34h-2.07c-.61,0-1.11-.49-1.11-1.11V1.79Zm2.22,16.7H2.56c-.87,0-1.6-.72-1.6-1.6V2.67c0-.87.73-1.6,1.6-1.6h7.06s0,2.94,0,2.94c0,1.13.91,2.04,2.04,2.04h2.7s0,10.83,0,10.83c0,.88-.73,1.6-1.6,1.6Z'
      />
      <path
        className='cls-1'
        d='m3.83,7.49h7.66c.26,0,.47-.21.47-.47s-.21-.47-.47-.47H3.83c-.26,0-.47.21-.47.47s.21.47.47.47Z'
      />
      <path
        className='cls-1'
        d='m8,9.16c-.09-.09-.21-.15-.34-.15s-.25.06-.34.15l-2.73,2.93c-.18.19-.16.48.02.66.19.18.48.16.66-.02l1.92-2.06v5.08c0,.26.21.47.47.47s.47-.21.47-.47v-5.08s1.92,2.06,1.92,2.06c.18.19.47.2.66.02s.2-.47.02-.66l-2.72-2.93Z'
      />
    </g>
  </svg>
)
