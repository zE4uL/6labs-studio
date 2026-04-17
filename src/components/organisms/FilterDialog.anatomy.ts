import type { ComponentMeta } from '../../design-system/types'
import { FilterDialogDemo } from './FilterDialog.demo'

export const meta: ComponentMeta = {
  id: 'filter-dialog',
  label: 'FilterDialog',
  category: 'organisms',
  description: 'Full modal filter panel with category sidebar, scrollable content, and action footer. 6 categories, Match Context fully implemented.',
  demo: FilterDialogDemo,
  anatomy: [
    { property: 'Dialog BG',           token: '--bg-elements',          variable: 'Neutral/White (3edd2c47…)',       value: '#FFFFFF' },
    { property: 'Dialog Radius',        token: '--radius-2xl',           variable: 'radius/2xl',                      value: '16px' },
    { property: 'Dialog Size',          token: '772×750px',              variable: '—',                                value: '772×750' },
    { property: 'Header Title',         token: 'font-display 600 --size-m', variable: 'DisplayFont, size/m',          value: 'Bricolage 16px SemiBold' },
    { property: 'Header Title Color',   token: '--text-primary',         variable: 'Text & Icon/Primary (5bcb5ca0…)', value: '#030D2D' },
    { property: 'Close Icon Color',     token: '--text-tertiary',        variable: 'Text & Icon/Tertiary (6b879b88…)', value: '#818696' },
    { property: 'Body Border',          token: '--bg-subtle',            variable: 'Base/Base - 50 (53dee2fa…)',      value: '#E6E7EA' },
    { property: 'Sidebar Width',        token: '260px',                  variable: '—',                                value: '260px' },
    { property: 'Sidebar Item Font',    token: 'font-display 600 --size-s', variable: 'DisplayFont, size/s',          value: 'Bricolage 14px SemiBold' },
    { property: 'Sidebar Item Color',   token: '--text-secondary',       variable: 'Base/Base - 600 (0a2933ab…)',     value: '#4F566C' },
    { property: 'Sidebar Active BG',    token: '--bg-tint',              variable: 'Brand Blue/Tint (d1a9b4c4…)',     value: 'rgba(23,112,239,0.14)' },
    { property: 'Indicator Bar',        token: '--brand',                variable: 'Brand Blue/500 (8a8916d8…)',      value: '#1770EF' },
    { property: 'Surface Panel BG',     token: '--neutral-surface',      variable: 'Neutral/Surface (bcdcb8da…)',     value: '#F1F1F1' },
    { property: 'Filter Card BG',       token: '--bg-elements',          variable: 'Neutral/White (3edd2c47…)',       value: '#FFFFFF' },
    { property: 'Section Header',       token: 'font-display 600 10px', variable: 'Label/Medium',                     value: 'Bricolage 10px tracking 1.5px' },
    { property: 'Section Header Color', token: '--text-secondary',       variable: 'Base/Base - 600 (0a2933ab…)',     value: '#4F566C @ 80%' },
    { property: 'Footer Padding',       token: '20px',                   variable: '—',                                value: '20px' },
    { property: 'Selected Count Font',  token: 'font-display 600 --size-s', variable: 'DisplayFont, size/s',          value: 'Bricolage 14px SemiBold' },
  ],
}
