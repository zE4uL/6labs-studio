import type { ComponentMeta } from '../../design-system/types'
import Toggle from './Toggle'

export const meta: ComponentMeta = {
  id: 'toggle',
  label: 'Toggle',
  category: 'atoms',
  description: 'Apparatus toggle/switch control. On/off states with optional label and label position.',
  component: Toggle,
  anatomy: [
    { property: 'Track (off)',          token: 'bg-bg-subtle',           variable: 'Background/Subtle (389caeb1…)', value: '#E6E7EA' },
    { property: 'Track (on)',           token: 'bg-brand',               variable: 'Brand Blue/500 (8a8916d8…)',   value: '#1770EF' },
    { property: 'Thumb',               token: 'bg-white',               variable: 'Neutral/White (3edd2c47…)',    value: '#FFFFFF' },
    { property: 'Label',               token: 'text-text-primary',      variable: 'Base/Base - 900 (60221769…)',  value: '#030D2D' },
    { property: 'Track Radius',         token: 'rounded-round',          variable: 'radius/round',                value: '999px' },
    { property: 'Track Size',           token: 'w-[36px] h-[20px]',     variable: '—',                            value: '36×20px' },
  ],
}
