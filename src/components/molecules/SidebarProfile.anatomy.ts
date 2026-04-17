import type { ComponentMeta } from '../../design-system/types'
import { SidebarProfileDemo } from './SidebarProfile.demo'

export const meta: ComponentMeta = {
  id: 'sidebar-profile',
  label: 'SidebarProfile',
  category: 'molecules',
  description: 'Sidebar footer profile card with avatar, name, and language badge.',
  demo: SidebarProfileDemo,
  anatomy: [
    { property: 'Avatar BG',            token: 'bg-brand',               variable: 'Brand Blue/500 (8a8916d8…)', value: '#1770EF' },
    { property: 'Name',                 token: 'text-text-primary',      variable: 'Base/Base - 900 (60221769…)', value: '#030D2D' },
    { property: 'Language Badge',        token: 'text-text-tertiary',     variable: 'Base/Base - 400 (188d3920…)', value: '#818696' },
    { property: 'Font (name)',           token: 'font-display text-s',    variable: 'DisplayFont, size/s',         value: 'Bricolage 14px' },
  ],
}
