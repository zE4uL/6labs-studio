import type { ComponentMeta } from '../../design-system/types'
import { ProgressBar } from './ProgressBar'

export const meta: ComponentMeta = {
  id: 'progress-bar',
  label: 'ProgressBar',
  category: 'atoms',
  description: 'Thin 4px progress indicator. Brand blue fill on subtle background with animated width transition.',
  component: ProgressBar,
  anatomy: [
    { property: 'Track BG',    token: 'bg-bg-subtle',  variable: 'Background/Subtle (389caeb1…)', value: '#E6E7EA' },
    { property: 'Fill',        token: 'bg-brand',      variable: 'Brand Blue/500 (8a8916d8…)',   value: '#1770EF' },
    { property: 'Height',      token: 'h-[4px]',       variable: '—',                            value: '4px' },
    { property: 'Radius',      token: 'rounded-round',  variable: 'radius/round',                value: '999px' },
  ],
}
