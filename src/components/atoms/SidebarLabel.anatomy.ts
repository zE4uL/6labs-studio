import type { ComponentMeta } from '../../design-system/types'
import { SidebarLabel } from './SidebarLabel'

export const meta: ComponentMeta = {
  id: 'sidebar-label',
  label: 'SidebarLabel',
  category: 'atoms',
  description: 'Small label badge used in sidebar nav items. Supports default, muted, outlined, and subtle-focus variants.',
  component: SidebarLabel,
  anatomy: [
    { property: 'Text (muted)',         token: 'text-text-tertiary',     variable: 'Base/Base - 400 (188d3920…)', value: '#818696' },
    { property: 'Text (outlined)',      token: 'text-text-secondary',    variable: 'Base/Base - 600 (0a2933ab…)', value: '#4F566C' },
    { property: 'Border (outlined)',    token: 'border-border-default',  variable: 'Border/Default (82f2b096…)',  value: '#CDCFD5' },
    { property: 'Font',                 token: 'font-display text-2xs',  variable: 'DisplayFont, size/2xs',       value: 'Bricolage 11px' },
  ],
  renderHints: {
    groups: [
      { label: 'Variants', prop: 'variant' },
    ],
    defaultProps: { label: 'LABEL' },
  },
}
