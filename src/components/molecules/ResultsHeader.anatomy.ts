import type { ComponentMeta } from '../../design-system/types'
import { ResultsHeader } from './ResultsHeader'

export const meta: ComponentMeta = {
  id: 'results-header',
  label: 'ResultsHeader',
  category: 'molecules',
  description: 'Section heading displaying the count of found sessions.',
  component: ResultsHeader,
  anatomy: [
    { property: 'Text Color',   token: 'text-text-primary',      variable: 'Base/Base - 900 (d27028fd…)', value: '#030D2D' },
    { property: 'Font',          token: 'font-display text-m',    variable: 'DisplayFont, size/m',         value: 'Bricolage 16px' },
    { property: 'Font Weight',   token: 'font-semibold',          variable: 'weight/semibold',             value: '600' },
  ],
}
