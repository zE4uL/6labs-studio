import type { ComponentMeta } from '../../design-system/types'
import { SessionInfoCard } from './SessionInfoCard'

export const meta: ComponentMeta = {
  id: 'session-info-card',
  label: 'SessionInfoCard',
  category: 'molecules',
  description: '2x2 grid of InfoItem cells showing session metadata (duration, region, platform, game mode).',
  component: SessionInfoCard,
  anatomy: [
    { property: 'Section Title',   token: 'font-display text-s',    variable: 'DisplayFont, size/s',         value: 'Bricolage 14px' },
    { property: 'Title Color',     token: 'text-text-primary',      variable: 'Base/Base - 900 (d27028fd…)', value: '#030D2D' },
    { property: 'Icon Color',      token: 'text-text-tertiary',     variable: 'Base/Base - 400 (188d3920…)', value: '#818696' },
    { property: 'Grid Gap',        token: 'gap-s',                  variable: 'space/s',                     value: '12px' },
  ],
}
