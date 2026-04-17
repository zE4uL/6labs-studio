import type { ComponentType, ReactNode } from 'react'

export interface AnatomyEntry {
  property: string
  token: string
  variable: string
  value: string
}

export interface RenderGroup {
  label: string
  prop: string
  [key: string]: unknown
}

export interface RenderHints {
  groups: RenderGroup[]
  defaultChildren?: ReactNode | string
  defaultProps?: Record<string, unknown>
}

export type Category = 'foundations' | 'atoms' | 'molecules' | 'organisms'

export interface ComponentMeta {
  id: string
  label: string
  category: Category
  description: string
  component?: ComponentType<any>
  /** Custom demo component — use for modals, dropdowns, complex stateful components */
  demo?: ComponentType
  anatomy: AnatomyEntry[]
  renderHints?: RenderHints
}

export interface PropTypeInfo {
  [propName: string]: string[] | boolean[]
}
