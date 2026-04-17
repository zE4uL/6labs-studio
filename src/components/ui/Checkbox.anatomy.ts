import type { ComponentMeta } from '../../design-system/types'
import Checkbox from './Checkbox'

export const meta: ComponentMeta = {
  id: 'checkbox',
  label: 'Checkbox',
  category: 'atoms',
  description: 'Apparatus checkbox and radio control. Supports checked, unchecked, indeterminate, and disabled states with two sizes.',
  component: Checkbox,
  anatomy: [
    { property: 'Border (unchecked)',   token: 'border-border-default',  variable: 'Border/Default (82f2b096…)',   value: '#CDCFD5' },
    { property: 'Fill (checked)',       token: 'bg-brand',               variable: 'Brand Blue/500 (8a8916d8…)',   value: '#1770EF' },
    { property: 'Checkmark',           token: 'text-white',             variable: 'Neutral/White (3edd2c47…)',    value: '#FFFFFF' },
    { property: 'Label',               token: 'text-text-primary',      variable: 'Base/Base - 900 (60221769…)',  value: '#030D2D' },
    { property: 'Size (md)',            token: 'w-[18px] h-[18px]',     variable: '—',                            value: '18px' },
    { property: 'Size (sm)',            token: 'w-[14px] h-[14px]',     variable: '—',                            value: '14px' },
    { property: 'Radius',              token: 'rounded-[4px]',          variable: 'radius/xs',                    value: '4px' },
  ],
  renderHints: {
    groups: [
      { label: 'States', prop: 'checked' },
    ],
    defaultProps: { label: 'Checkbox', onChange: () => {} },
  },
}
