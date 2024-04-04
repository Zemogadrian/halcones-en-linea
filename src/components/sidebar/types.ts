export type SideBarOptions = SideBarOption[]

export interface SideBarOption {
  title: string
  sub?: SubElement[]
}

export interface SubElement {
  title: string
  href: string
  type?: string
  defaultRef?: string
  queryParams?: Record<string, string | number>
}
