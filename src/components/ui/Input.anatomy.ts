import type { ComponentMeta } from '../../design-system/types'
import Input from './Input'

export const meta: ComponentMeta = {
  id: 'input',
  label: 'Input',
  category: 'atoms',
  description: 'Apparatus-spec text input. Supports 4 sizes, 6 states, optional label, helper/error message, and left/right icon slots.',
  component: Input,
  anatomy: [
    { property: 'Border (default)',     token: 'border-border-default',  variable: 'Border/Default (82f2b096…)',   value: '#CDCFD5' },
    { property: 'Border (focus)',       token: 'border-border-focus',    variable: 'Brand Blue/500 (8a8916d8…)',   value: '#1770EF' },
    { property: 'Border (error)',       token: 'border-error',           variable: 'Status/Error (38b180f4…)',     value: '#C9392A' },
    { property: 'BG',                   token: 'bg-bg-elements',         variable: 'Neutral/White (3edd2c47…)',    value: '#FFFFFF' },
    { property: 'Text',                 token: 'text-text-primary',      variable: 'Base/Base - 900 (60221769…)',  value: '#030D2D' },
    { property: 'Placeholder',          token: 'text-text-placeholder',  variable: 'Base/Base - 300 (dc95cee5…)',  value: '#9A9EAB' },
    { property: 'Label',               token: 'text-text-tertiary',     variable: 'Base/Base - 400 (188d3920…)',  value: '#818696' },
    { property: 'Font',                 token: 'font-body',              variable: 'BodyFont',                     value: 'Inter' },
    { property: 'Radius',              token: 'rounded-s',              variable: 'radius/s',                     value: '6px' },
    { property: 'Padding (md)',         token: 'px-s h-10',              variable: 'space/s',                      value: '12px, h 40px' },
  ],
  renderHints: {
    groups: [
      { label: 'Sizes', prop: 'size' },
    ],
    defaultProps: { label: 'Label', placeholder: 'Placeholder...' },
  },
}
