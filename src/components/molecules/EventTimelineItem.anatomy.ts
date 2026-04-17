import type { ComponentMeta } from '../../design-system/types'
import { EventTimelineItem } from './EventTimelineItem'

export const meta: ComponentMeta = {
  id: 'event-timeline-item',
  label: 'EventTimelineItem',
  category: 'molecules',
  description: 'Single event row in a session timeline with type tag, timestamp, and description.',
  component: EventTimelineItem,
  anatomy: [
    { property: 'Border Bottom',    token: 'border-border-subtle',   variable: 'Border/Subtle',               value: '#E6E7EA' },
    { property: 'Timestamp',        token: 'text-text-tertiary',     variable: 'Base/Base - 400 (188d3920…)', value: '#818696' },
    { property: 'Description',      token: 'text-text-secondary',    variable: 'Base/Base - 600 (0a2933ab…)', value: '#4F566C' },
    { property: 'Padding',          token: 'py-s px-m',              variable: 'space/s, space/m',            value: '12px 16px' },
    { property: 'Radius',           token: 'rounded-m',              variable: 'radius/m',                    value: '8px' },
  ],
}
