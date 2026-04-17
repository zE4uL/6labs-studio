import type { ComponentMeta } from '../../../design-system/types'

export const meta: ComponentMeta = {
  id: 'icons',
  label: 'Icons',
  category: 'foundations',
  description: 'All icon components from the Apparatus library with default and active colors.',
  anatomy: [
    { property: 'Icon Color (default)', token: 'text-text-secondary',  variable: 'Text/Secondary (0a2933ab…)', value: '#4F566C' },
    { property: 'Icon Color (active)',   token: 'text-brand',          variable: 'Brand Blue/500 (8a8916d8…)', value: '#1770EF' },
    { property: 'Icon Size (default)',   token: '24px',                variable: 'size/icon-md',  value: '24px' },
    { property: 'Icon Size (small)',     token: '16px',                variable: 'size/icon-sm',  value: '16px' },
  ],
}
