import type { ComponentMeta } from '../../design-system/types'
import { FilterTag } from './FilterTag'

export const meta: ComponentMeta = {
  id: 'filter-tag',
  label: 'FilterTag',
  category: 'atoms',
  description: 'Selectable pill tag for filter sections. Default: bordered. Selected: brand tint bg + brand text.',
  component: FilterTag,
  anatomy: [
    { property: 'Default BG',      token: 'transparent',            variable: '—',                            value: 'transparent' },
    { property: 'Default Border',   token: 'rgba(0,0,0,0.1)',       variable: '—',                            value: 'rgba(0,0,0,0.1)' },
    { property: 'Default Text',     token: '--base-700',             variable: 'Base/Base - 700 (261c4c6e…)',  value: '#353D57' },
    { property: 'Selected BG',      token: '--bg-tint',              variable: 'Brand Blue/Tint (d1a9b4c4…)', value: 'rgba(23,112,239,0.14)' },
    { property: 'Selected Text',    token: '--brand',                variable: 'Brand Blue/500 (8a8916d8…)',  value: '#1770EF' },
    { property: 'Font',             token: 'font-body, --size-2xs',  variable: 'BodyFont, size/2xs',           value: 'Inter 10px' },
    { property: 'Height',           token: '24px',                   variable: '—',                            value: '24px' },
    { property: 'Padding',          token: '4px 8px',                variable: '—',                            value: '4px 8px' },
    { property: 'Radius',           token: '--radius-xs',            variable: 'radius/xs',                    value: '4px' },
  ],
}
