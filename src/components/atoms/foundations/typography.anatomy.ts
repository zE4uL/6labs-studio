import type { ComponentMeta } from '../../../design-system/types'

export const meta: ComponentMeta = {
  id: 'typography',
  label: 'Typography',
  category: 'foundations',
  description: 'Display and body type scale, font families, and text styles.',
  anatomy: [
    { property: 'Display Font',    token: 'font-display',   variable: 'DisplayFont', value: 'Bricolage Grotesque' },
    { property: 'Body Font',       token: 'font-body',      variable: 'BodyFont', value: 'Inter' },
    { property: 'Size / 4XL',      token: 'text-4xl',       variable: 'size/4xl', value: '36px' },
    { property: 'Size / 2XL',      token: 'text-2xl',       variable: 'size/2xl', value: '24px' },
    { property: 'Size / L',        token: 'text-l',         variable: 'size/l', value: '20px' },
    { property: 'Size / M',        token: 'text-m',         variable: 'size/m', value: '16px' },
    { property: 'Size / S',        token: 'text-s',         variable: 'size/s', value: '14px' },
    { property: 'Size / XS',       token: 'text-xs',        variable: 'size/xs', value: '12px' },
    { property: 'Size / 2XS',      token: 'text-2xs',       variable: 'size/2xs', value: '11px' },
  ],
}
