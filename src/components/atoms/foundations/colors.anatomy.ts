import type { ComponentMeta } from '../../../design-system/types'

export const meta: ComponentMeta = {
  id: 'colors',
  label: 'Color Tokens',
  category: 'foundations',
  description: 'Brand, base scale, semantic backgrounds, and status colors from the Apparatus token system.',
  anatomy: [
    { property: 'Brand/500',       token: '--brand',        variable: 'Brand Blue/500 (8a8916d8…)', value: '#1770EF' },
    { property: 'Brand/600',       token: '--brand-pressed', variable: 'Brand Blue/600 (9d8a3571…)', value: '#0D5ED4' },
    { property: 'Brand/400',       token: '--brand-hover',  variable: 'Brand Blue/400 (fa855e11…)', value: '#4D8FF5' },
    { property: 'Base/900',        token: 'text-base-900',  variable: 'Base/Base - 900 (60221769…)', value: '#030D2D' },
    { property: 'Base/600',        token: 'text-base-600',  variable: 'Base/Base - 600 (0a2933ab…)', value: '#4F566C' },
    { property: 'Base/100',        token: 'text-base-100',  variable: 'Base/Base - 100 (82f2b096…)', value: '#CDCFD5' },
    { property: 'Base/50',         token: 'text-base-50',   variable: 'Base/Base - 50 (53dee2fa…)', value: '#E6E7EA' },
    { property: 'White',           token: 'bg-bg-elements', variable: 'Neutral/White (3edd2c47…)', value: '#FFFFFF' },
    { property: 'Surface',         token: 'bg-bg-page',     variable: 'Neutral/Surface (bcdcb8da…)', value: '#F1F1F1' },
    { property: 'Error',           token: '--error',        variable: 'Status/Error (38b180f4…)', value: '#C9392A' },
    { property: 'Success',         token: '--success',      variable: 'Status/Success (c053dc86…)', value: '#16A34A' },
    { property: 'Warning',         token: '--warning',      variable: 'Status/Warning (737cf720…)', value: '#FFB700' },
  ],
}
