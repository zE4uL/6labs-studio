import type { ComponentMeta } from '../../design-system/types'
import { RangeSlider } from './RangeSlider'

export const meta: ComponentMeta = {
  id: 'range-slider',
  label: 'RangeSlider',
  category: 'atoms',
  description: 'Dual-handle range slider with min/max labels. Drag handles to adjust range.',
  component: RangeSlider,
  anatomy: [
    { property: 'Track BG',         token: '--bg-subtle',            variable: 'Base/Base - 50 (53dee2fa…)',   value: '#E6E7EA' },
    { property: 'Track Fill',        token: '--brand',                variable: 'Brand Blue/500 (8a8916d8…)',  value: '#1770EF' },
    { property: 'Track Height',      token: '2px',                   variable: '—',                            value: '2px' },
    { property: 'Thumb Border',      token: '--brand',                variable: 'Brand Blue/500 (8a8916d8…)',  value: '#1770EF' },
    { property: 'Thumb BG',          token: 'white',                 variable: 'Neutral/White (3edd2c47…)',   value: '#FFFFFF' },
    { property: 'Thumb Dot',         token: '--brand',                variable: 'Brand Blue/500 (8a8916d8…)',  value: '#1770EF' },
    { property: 'Thumb Size',        token: '16px',                  variable: '—',                            value: '16px' },
    { property: 'Label Font',        token: 'font-display 600',      variable: 'DisplayFont, weight/semibold', value: 'Bricolage 12px SemiBold' },
    { property: 'Label Color',       token: '--base-700',             variable: 'Base/Base - 700 (261c4c6e…)', value: '#353D57' },
  ],
}
