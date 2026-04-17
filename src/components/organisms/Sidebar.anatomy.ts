import type { ComponentMeta } from '../../design-system/types'

export const meta: ComponentMeta = {
  id: 'sidebar-organism',
  label: 'Sidebar',
  category: 'organisms',
  description: 'Full navigation panel composing SidebarNavItem, SidebarTaskItem, and SidebarProfile molecules.',
  anatomy: [
    { property: 'BG',                   token: 'bg-bg-elements',         variable: 'Neutral/White (3edd2c47…)',  value: '#FFFFFF' },
    { property: 'Border Right',         token: 'border-border-subtle',   variable: 'Border/Subtle',              value: '#E6E7EA' },
    { property: 'Width',                token: 'w-[280px]',              variable: '—',                          value: '280px' },
    { property: 'Padding',              token: 'p-m',                    variable: 'space/m',                    value: '16px' },
    { property: 'Gap',                  token: 'gap-xxs',                variable: 'space/xxs',                  value: '4px' },
  ],
}
