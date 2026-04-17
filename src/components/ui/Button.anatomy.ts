import type { ComponentMeta } from '../../design-system/types'
import Button from './Button'

export const meta: ComponentMeta = {
  id: 'button',
  label: 'Button',
  category: 'atoms',
  description: 'Apparatus-spec interactive button. Supports all 10 Type variants, 4 sizes, pill/icon-only shapes, and left/right icon slots.',
  component: Button,
  anatomy: [
    { property: 'Primary BG',          token: 'bg-brand',                variable: 'Brand Blue/500 (8a8916d8…)',   value: '#1770EF' },
    { property: 'Primary BG (hover)',   token: 'bg-brand-hover',          variable: 'Brand Blue/400 (fa855e11…)',   value: '#4D8FF5' },
    { property: 'Primary BG (pressed)', token: 'bg-brand-pressed',       variable: 'Brand Blue/600 (9d8a3571…)',   value: '#0D5ED4' },
    { property: 'Primary Text',         token: 'text-white',             variable: 'Neutral/White (3edd2c47…)',    value: '#FFFFFF' },
    { property: 'Secondary BG',         token: 'bg-bg-subtle',           variable: 'Background/Subtle (389caeb1…)', value: '#E6E7EA' },
    { property: 'Outline Border',       token: 'border-border-default',  variable: 'Border/Default (82f2b096…)',   value: '#CDCFD5' },
    { property: 'Danger BG',            token: 'bg-error',               variable: 'Status/Error (38b180f4…)',     value: '#C9392A' },
    { property: 'Font',                 token: 'font-display',           variable: 'DisplayFont',                  value: 'Bricolage Grotesque' },
    { property: 'Border Radius',        token: 'rounded-m',              variable: 'radius/m',                     value: '8px' },
    { property: 'Padding (md)',         token: 'px-m py-xs',             variable: 'space/m, space/xs',             value: '16px 8px' },
    { property: 'Figma Component',      token: 'Button set',             variable: 'Key: d4ae660adb35…',           value: 'Apparatus/Button' },
  ],
  renderHints: {
    groups: [
      { label: 'Variants (md)',  prop: 'variant', size: 'md' },
      { label: 'Sizes',         prop: 'size',    variant: 'primary' },
      { label: 'Disabled',      prop: 'variant', disabled: true },
      { label: 'Pill',          prop: 'variant', pill: true },
    ],
    defaultChildren: 'Button',
  },
}
