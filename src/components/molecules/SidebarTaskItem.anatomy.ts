import type { ComponentMeta } from '../../design-system/types'
import { SidebarTaskItemDemo } from './SidebarTaskItem.demo'

export const meta: ComponentMeta = {
  id: 'sidebar-task',
  label: 'SidebarTaskItem',
  category: 'molecules',
  description: 'Task row in sidebar with query text, loading/complete state indicators, and active highlight.',
  demo: SidebarTaskItemDemo,
  anatomy: [
    { property: 'BG',                   token: 'bg-bg-elements',         variable: 'Neutral/White (3edd2c47…)',   value: '#FFFFFF' },
    { property: 'BG (hover)',           token: 'bg-bg-subtle',           variable: 'Background/Subtle (389caeb1…)', value: '#E6E7EA' },
    { property: 'Text',                 token: 'text-text-primary',      variable: 'Base/Base - 900 (60221769…)', value: '#030D2D' },
    { property: 'Font',                 token: 'font-body text-s',       variable: 'BodyFont, size/s',            value: 'Inter 14px' },
    { property: 'Padding',              token: 'px-m py-xs',             variable: 'space/m, space/xs',           value: '16px 8px' },
  ],
}
