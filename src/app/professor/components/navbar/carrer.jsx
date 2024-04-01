'use client'
import { useParams } from 'next/navigation'

export const Carrer = ({ handleClick }) => {
  const params = useParams()
  const decodedSlug = decodeURIComponent(params.slug)

  const formattedSlug = decodedSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <h1 className='text-[#2c2b41] font-bold'>{formattedSlug}</h1>
  )
}
