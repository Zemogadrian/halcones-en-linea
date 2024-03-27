export type SideBarOptions = SideBarOption[]

export interface SideBarOption {
  title: string
  sub?: Array<{
    title: string
    href: string
    type?: string
    defaultRef?: string
  }>
}

export type NavBarOptions = Array<{
  title: string
  sub?: Array<{
    title: string
    href: string
  }>
}>
