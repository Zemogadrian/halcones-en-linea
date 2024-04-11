import { v4 } from '@/utils/uuid'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

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
}

interface Props {
  options: Option[]
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
  input: ({ onChange, placeholder, router, params, searchParams, pathname, state }) => (
    <input
      onChange={(e) => {
        onChange?.({ event: e, router, params, searchParams, pathname, state })
      }}
      placeholder={placeholder}
      className='bg-[#cdcccb] w-full text-itesus-secondary px-4 py-2 rounded-lg'
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
  options
}: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()
  const pathname = usePathname()

  const [store, setStore] = useState({})

  return (
    <div className='absolute w-full h-full flex flex-col justify-center items-center'>
      <ul className='space-y-2 w-full'>
        {options.map((option) => {
          const OptionComponent = OptionComponents[option.type]

          return (
            <li key={v4()}>
              <OptionComponent
                {...option}
                router={router}
                searchParams={searchParams}
                params={params}
                pathname={pathname}
                state={{ value: store, setStore }}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
