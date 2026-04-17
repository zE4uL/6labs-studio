import type { ComponentMeta } from '../../design-system/types'
import { AgentTabItem } from './AgentTabItem'

export const meta: ComponentMeta = {
  id: 'agent-tab',
  label: 'AgentTabItem',
  category: 'molecules',
  description: 'Agent tab button with icon and label. Active, default, and hover states.',
  component: AgentTabItem,
  anatomy: [
    { property: 'BG (active)',          token: 'var(--bg-highlighted)',   variable: 'Background/Highlighted',     value: '#1770EF' },
    { property: 'BG (default)',         token: 'transparent',            variable: '—',                          value: 'transparent' },
    { property: 'BG (hover)',           token: 'var(--bg-tint)',         variable: 'Background/Highlighted Tint', value: 'rgba(23,112,239,0.14)' },
    { property: 'Text (active)',        token: 'var(--text-on-brand)',   variable: 'Text & Icon/OnBrand',        value: '#FFFFFF' },
    { property: 'Text (default)',       token: 'var(--text-secondary)',  variable: 'Text & Icon/Secondary',      value: '#4F566C' },
    { property: 'Text (hover)',         token: 'var(--text-primary)',    variable: 'Text & Icon/Primary',        value: '#030D2D' },
    { property: 'Radius',              token: 'rounded-m',              variable: 'radius/m',                   value: '8px' },
    { property: 'Padding',              token: 'px-s py-xs',             variable: 'space/s, space/xs',          value: '12px 8px' },
  ],
}
