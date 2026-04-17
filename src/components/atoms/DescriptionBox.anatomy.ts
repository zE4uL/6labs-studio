import type { ComponentMeta } from '../../design-system/types'
import { DescriptionBox } from './DescriptionBox'

export const meta: ComponentMeta = {
  id: 'description-box',
  label: 'DescriptionBox',
  category: 'atoms',
  description: 'Apparatus multi-line text area. 5 states: Default, Hover, Filled, Focused, Disabled. No buttons — pure input atom.',
  component: DescriptionBox,
  anatomy: [
    { property: 'Border (default)',  token: 'border-border-default',  variable: 'Border/Default (82f2b096…)', value: '#CDCFD5' },
    { property: 'Border (hover)',    token: 'border-brand',           variable: 'Brand Blue/500 (8a8916d8…)', value: '#1770EF' },
    { property: 'Border (focused)',  token: 'border-brand',           variable: 'Brand Blue/500 (8a8916d8…)', value: '#1770EF' },
    { property: 'BG (default)',      token: 'bg-bg-elements',         variable: 'Neutral/White (3edd2c47…)', value: '#FFFFFF' },
    { property: 'BG (disabled)',     token: 'bg-bg-subtle',           variable: 'Background/Subtle',         value: '#E6E7EA' },
    { property: 'Font',              token: 'font-body text-s',       variable: 'BodyFont, size/s',          value: 'Inter 14px' },
  ],
}
