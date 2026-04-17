import type { ComponentMeta } from '../../../design-system/types'

export const meta: ComponentMeta = {
  id: 'shadows-radii',
  label: 'Shadows & Radii',
  category: 'foundations',
  description: 'Elevation shadows and border radius tokens.',
  anatomy: [
    { property: 'Shadow SM',       token: 'shadow-sm',     variable: 'elevation/sm',    value: '0 1px 2px rgba(0,0,0,0.06)' },
    { property: 'Shadow Normal',   token: 'shadow-normal', variable: 'elevation/normal', value: '0 2px 8px rgba(0,0,0,0.08)' },
    { property: 'Shadow Big',      token: 'shadow-big',    variable: 'elevation/big',    value: '0 8px 24px rgba(0,0,0,0.12)' },
    { property: 'Radius XS',       token: 'rounded-xs',    variable: 'radius/xs',  value: '4px' },
    { property: 'Radius S',        token: 'rounded-s',     variable: 'radius/s',   value: '6px' },
    { property: 'Radius M',        token: 'rounded-m',     variable: 'radius/m',   value: '8px' },
    { property: 'Radius XL',       token: 'rounded-xl',    variable: 'radius/xl',  value: '12px' },
    { property: 'Radius 2XL',      token: 'rounded-2xl',   variable: 'radius/2xl', value: '16px' },
    { property: 'Radius Round',    token: 'rounded-round', variable: 'radius/round', value: '999px' },
  ],
}
