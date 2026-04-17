import type { ComponentMeta } from '../../design-system/types'
import { SidebarNavItemDemo } from './SidebarNavItem.demo'

export const meta: ComponentMeta = {
  id: 'sidebar-nav',
  label: 'SidebarNavItem',
  category: 'molecules',
  description: 'Sidebar navigation row with icon, label, optional badge. Supports active, hover, and disabled states.',
  demo: SidebarNavItemDemo,
  anatomy: [
    { property: 'BG (active)',          token: 'bg-bg-tint',             variable: 'Brand Blue/Tint (d1a9b4c4…)', value: 'rgba(23,112,239,0.14)' },
    { property: 'BG (hover)',           token: 'bg-bg-tint-light',       variable: 'Brand Blue/Tint Light (c19e1b61…)', value: 'rgba(23,112,239,0.07)' },
    { property: 'Text (active)',        token: 'text-brand',             variable: 'Brand Blue/500 (8a8916d8…)', value: '#1770EF' },
    { property: 'Text (default)',       token: 'text-text-secondary',    variable: 'Base/Base - 600 (0a2933ab…)', value: '#4F566C' },
    { property: 'Text (disabled)',      token: 'text-text-placeholder',  variable: 'Base/Base - 300 (dc95cee5…)', value: '#9A9EAB' },
    { property: 'Icon Size',            token: '20px',                   variable: 'size/icon-md',                value: '20px' },
    { property: 'Padding',              token: 'px-m py-xs',             variable: 'space/m, space/xs',           value: '16px 8px' },
  ],
}
