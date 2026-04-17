import type { ComponentMeta } from '../../design-system/types'
import { EventTag } from './EventTag'

export const meta: ComponentMeta = {
  id: 'event-tag',
  label: 'EventTag',
  category: 'atoms',
  description: 'Small pill-shaped tag for event labels. Used in video cards and session metadata.',
  component: EventTag,
  anatomy: [
    { property: 'BG',                   token: 'bg-bg-subtle',           variable: 'Background/Subtle → Base/50', value: '#E6E7EA' },
    { property: 'Text',                 token: 'text-text-secondary',    variable: 'Base/Base - 600 (0a2933ab…)', value: '#4F566C' },
    { property: 'Font',                 token: 'font-body text-2xs',     variable: 'BodyFont, size/2xs',          value: 'Inter 11px' },
    { property: 'Padding',              token: 'px-xs py-xxxs',          variable: 'space/xs, space/xxxs',        value: '8px 2px' },
    { property: 'Radius',              token: 'rounded-round',          variable: 'radius/round',                value: '999px' },
  ],
  renderHints: {
    groups: [
      { label: 'Examples', prop: 'label' },
    ],
  },
}
