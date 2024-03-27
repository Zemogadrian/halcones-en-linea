import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

export interface NavBarItem {
  startWith: string
  getRoutes: (params: { params: Params }) => Array<{
    name: string
    href: string
    ref: string
    queryParam: string
  }>
}
