import type { ComponentMeta } from '../../design-system/types'
import { EventTypeTag } from './EventTypeTag'

export const meta: ComponentMeta = {
  id: 'event-type-tag',
  label: 'EventTypeTag',
  category: 'atoms',
  description: 'Colored pill tag for event types (kill, death, loot, etc.) in session timelines.',
  component: EventTypeTag,
  anatomy: [
    { property: 'Text',         token: 'font-body text-2xs',     variable: 'BodyFont, size/2xs',          value: 'Inter 11px' },
    { property: 'Font Weight',  token: 'font-medium',            variable: 'weight/medium',               value: '500' },
    { property: 'Padding',      token: 'px-xs py-xxxs',          variable: 'space/xs, space/xxxs',        value: '8px 2px' },
    { property: 'Radius',       token: 'rounded-round',          variable: 'radius/round',                value: '999px' },
  ],
}
