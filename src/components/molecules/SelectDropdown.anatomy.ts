import type { ComponentMeta } from '../../design-system/types'

export const meta: ComponentMeta = {
  id: 'select-dropdown',
  label: 'SelectDropdown',
  category: 'molecules',
  description: 'Dropdown panel with grouped items, optional header, and selection highlighting. Requires groups array — not auto-renderable.',
  anatomy: [
    { property: 'Panel BG',             token: 'bg-bg-elements',         variable: 'Neutral/White (3edd2c47…)',  value: '#FFFFFF' },
    { property: 'Panel Border',         token: 'border-border-default',  variable: 'Border/Default (82f2b096…)', value: '#CDCFD5' },
    { property: 'Panel Radius',         token: 'rounded-xl',             variable: 'radius/xl',                  value: '12px' },
    { property: 'Item (selected)',       token: 'bg-bg-tint-light',       variable: 'Brand Blue/Tint Light (c19e1b61…)', value: 'rgba(23,112,239,0.07)' },
    { property: 'Item Text',            token: 'text-text-primary',      variable: 'Base/Base - 900 (60221769…)', value: '#030D2D' },
    { property: 'Header Text',          token: 'text-text-tertiary',     variable: 'Base/Base - 400 (188d3920…)', value: '#818696' },
    { property: 'Item Padding',         token: 'px-s py-xxs',            variable: 'space/s, space/xxs',         value: '12px 4px' },
  ],
}
