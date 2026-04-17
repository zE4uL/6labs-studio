import type { ComponentMeta } from '../../../design-system/types'

export const meta: ComponentMeta = {
  id: 'spacing',
  label: 'Spacing Scale',
  category: 'foundations',
  description: 'Spacing tokens from xxxs (2px) to xxxl (40px) used for padding, margins, and gaps.',
  anatomy: [
    { property: 'xxxs', token: 'gap-xxxs / p-xxxs',  variable: 'space/xxxs', value: '2px' },
    { property: 'xxs',  token: 'gap-xxs / p-xxs',    variable: 'space/xxs',  value: '4px' },
    { property: 'xs',   token: 'gap-xs / p-xs',      variable: 'space/xs',   value: '8px' },
    { property: 's',    token: 'gap-s / p-s',         variable: 'space/s',    value: '12px' },
    { property: 'm',    token: 'gap-m / p-m',         variable: 'space/m',    value: '16px' },
    { property: 'l',    token: 'gap-l / p-l',         variable: 'space/l',    value: '20px' },
    { property: 'xl',   token: 'gap-xl / p-xl',       variable: 'space/xl',   value: '24px' },
    { property: 'xxl',  token: 'gap-xxl / p-xxl',     variable: 'space/xxl',  value: '32px' },
    { property: 'xxxl', token: 'gap-xxxl / p-xxxl',   variable: 'space/xxxl', value: '40px' },
  ],
}
