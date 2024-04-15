import { v4 } from '@/utils/uuid'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { AnimateContainer } from './animate-container'

export type OptionTypes = 'button' | 'input' | 'select'

interface OnChangeEvent {
  event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  router: AppRouterInstance
  params: Params
  searchParams: URLSearchParams
  pathname: string
  state: {
    value: Record<string, any>
    setStore: (store: Record<string, any>) => void
  }
}

export interface Option {
  type: OptionTypes
  onChange?: (onChangeEvent: OnChangeEvent) => void
  onClick?: () => void
  placeholder?: string
  options?: Array<{
    value: string
    label: string
  }>
  children?: React.ReactNode
  onlyElement?: boolean
  value?: string
}

interface Props {
  options: Option[]
  currentPosition: number
  position: number
}

interface OptionComponentProps extends Option {
  router: AppRouterInstance
  searchParams: URLSearchParams
  params: Params
  pathname: string
  state: {
    value: Record<string, any>
    setStore: (store: Record<string, any>) => void
  }
  unique: boolean
}

const OptionComponents: {
  [K in OptionTypes]: React.FC<OptionComponentProps>
} = {
  button: ({ onClick, placeholder, children }) => (
    <button
      onClick={onClick}
      className='bg-[#cdcccb] w-full text-itesus-secondary px-4 py-2 rounded-lg hover:bg-[#b9b9b8] transition-colors hover:text-[#020305]'
    >
      {placeholder ?? children}
    </button>
  ),
  input: ({ onChange, placeholder, router, params, searchParams, pathname, state, unique, value }) => (
    <input
      onChange={(e) => {
        onChange?.({ event: e, router, params, searchParams, pathname, state })
      }}
      value={value}
      placeholder={placeholder}
      className={`${unique ? 'bg-transparent text-white text-center' : 'bg-[#cdcccb] text-itesus-secondary'} w-full h-full px-4 py-2 rounded-lg outline-none`}
    />
  ),
  select: ({ onChange, options, router, params, searchParams, pathname, state }) => (
    <select
      className='bg-[#cdcccb] w-full text-itesus-secondary px-4 py-2 rounded-lg text-center'
      onChange={(e) => {
        onChange?.({ event: e, router, params, searchParams, pathname, state })
      }}
    >
      {options?.map(({ value, label }) => (
        <option key={v4()} value={value}>{label}</option>
      ))}
    </select>
  )

}

export function InteractiveBox ({
  options,
  currentPosition,
  position
}: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()
  const pathname = usePathname()

  const [store, setStore] = useState({})

  return (
    <AnimateContainer
      currentPosition={currentPosition}
      position={position}
    >
      <ul className='flex w-full h-full justify-center items-center border border-[#cdcccb8e] rounded-md focus:border-white hover:border-white transition-colors'>
        {options.map((option) => {
          const OptionComponent = OptionComponents[option.type]
          const isUniqueOption = options.length === 1

          return (
            <li key={v4()} className={`${isUniqueOption ? 'h-full' : ''} w-full`}>
              <OptionComponent
                {...option}
                router={router}
                searchParams={searchParams}
                params={params}
                pathname={pathname}
                state={{ value: store, setStore }}
                unique={isUniqueOption}
              />
            </li>
          )
        })}
      </ul>
    </AnimateContainer>
  )
}
