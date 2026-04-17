import type { ComponentMeta } from '../../design-system/types'
import { InfoItem } from './InfoItem'

export const meta: ComponentMeta = {
  id: 'info-item',
  label: 'InfoItem',
  category: 'atoms',
  description: 'Label + value pair with optional icon for session metadata display.',
  component: InfoItem,
  anatomy: [
    { property: 'Border',       token: 'border-border-subtle',   variable: 'Border/Subtle',               value: '#E6E7EA' },
    { property: 'Label Text',   token: 'text-text-tertiary',     variable: 'Base/Base - 400 (188d3920…)', value: '#818696' },
    { property: 'Value Text',   token: 'font-display text-s',    variable: 'DisplayFont, size/s',         value: 'Bricolage 14px' },
    { property: 'Padding',      token: 'p-s',                    variable: 'space/s',                     value: '12px' },
    { property: 'Radius',       token: 'rounded-m',              variable: 'radius/m',                    value: '8px' },
  ],
}
