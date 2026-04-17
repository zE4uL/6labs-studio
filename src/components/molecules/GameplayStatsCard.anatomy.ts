import type { ComponentMeta } from '../../design-system/types'
import { GameplayStatsCard } from './GameplayStatsCard'

export const meta: ComponentMeta = {
  id: 'gameplay-stats-card',
  label: 'GameplayStatsCard',
  category: 'molecules',
  description: 'Row of 3 StatCard cells for session gameplay statistics (eliminations, deaths, placement).',
  component: GameplayStatsCard,
  anatomy: [
    { property: 'Section Title',   token: 'font-display text-s',    variable: 'DisplayFont, size/s',         value: 'Bricolage 14px' },
    { property: 'Title Color',     token: 'text-text-primary',      variable: 'Base/Base - 900 (d27028fd…)', value: '#030D2D' },
    { property: 'Success Value',   token: 'stat-card-success',      variable: 'Success (16A34A)',            value: '#16A34A' },
    { property: 'Error Value',     token: 'stat-card-error',        variable: 'Error (C9392A)',              value: '#C9392A' },
    { property: 'Row Gap',         token: 'gap-s',                  variable: 'space/s',                     value: '12px' },
  ],
}
