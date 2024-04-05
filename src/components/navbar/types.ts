import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { HTMLAttributeAnchorTarget } from 'react'

export interface NavBarItem {
  startWith: string
  getRoutes: (params: { params: Params, queryParams: URLSearchParams }) => NavRoute[]
}

interface OnClickProps {
  router: AppRouterInstance
}

export interface NavRoute {
  name: string
  href?: string
  ref?: string
  queryParam?: string
  onClick?: (props: OnClickProps) => void
  target?: HTMLAttributeAnchorTarget
}
