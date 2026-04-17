import type { ComponentMeta } from '../../design-system/types'
import { VideoCardDemo } from './VideoCard.demo'

export const meta: ComponentMeta = {
  id: 'video-card',
  label: 'VideoCard',
  category: 'molecules',
  description: 'Session video card with thumbnail, title, date, duration, description, and event tags.',
  demo: VideoCardDemo,
  anatomy: [
    { property: 'Card BG',              token: 'bg-bg-elements',         variable: 'Neutral/White (3edd2c47…)',  value: '#FFFFFF' },
    { property: 'Card Border',          token: 'border-border-subtle',   variable: 'Border/Subtle',              value: '#E6E7EA' },
    { property: 'Card Radius',          token: 'rounded-2xl',            variable: 'radius/2xl',                 value: '16px' },
    { property: 'Card Shadow',          token: 'shadow-sm',              variable: 'elevation/sm',               value: '0 1px 2px rgba(0,0,0,0.06)' },
    { property: 'Title',                token: 'font-display text-s',    variable: 'DisplayFont, size/s',        value: 'Bricolage 14px' },
    { property: 'Meta Text',            token: 'text-text-tertiary',     variable: 'Base/Base - 400 (188d3920…)', value: '#818696' },
    { property: 'Padding',              token: 'p-m',                    variable: 'space/m',                    value: '16px' },
  ],
}
