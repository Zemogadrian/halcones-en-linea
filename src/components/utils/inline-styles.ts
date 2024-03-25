import { CSSProperties } from 'react'

export const ShyScrollbar: CSSProperties = {
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent'
}

export const autoColumns = (minWidth: string, fr: string) => `repeat(auto-fill, minmax(${minWidth}, ${fr}))`
