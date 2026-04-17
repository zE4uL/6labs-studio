import type { ComponentMeta } from '../../design-system/types'
import { StatCard } from './StatCard'

export const meta: ComponentMeta = {
  id: 'stat-card',
  label: 'StatCard',
  category: 'atoms',
  description: 'Single gameplay statistic card with label, value, and optional color variant (success/error).',
  component: StatCard,
  anatomy: [
    { property: 'Card BG',      token: 'bg-bg-elements',         variable: 'Neutral/White (3edd2c47…)',   value: '#FFFFFF' },
    { property: 'Card Border',   token: 'border-border-subtle',   variable: 'Border/Subtle',               value: '#E6E7EA' },
    { property: 'Value Text',    token: 'font-display text-l',    variable: 'DisplayFont, size/l',         value: 'Bricolage 18px' },
    { property: 'Label Text',    token: 'text-text-tertiary',     variable: 'Base/Base - 400 (188d3920…)', value: '#818696' },
    { property: 'Radius',        token: 'rounded-xl',             variable: 'radius/xl',                   value: '12px' },
  ],
}
