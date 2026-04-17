import type { ComponentMeta } from '../../design-system/types'
import { PlaylistVideoCard } from './PlaylistVideoCard'

export const meta: ComponentMeta = {
  id: 'playlist-video-card',
  label: 'PlaylistVideoCard',
  category: 'molecules',
  description: 'Small horizontal video card for the playlist sidebar with thumbnail, title, date, and event tags.',
  component: PlaylistVideoCard,
  anatomy: [
    { property: 'Title',           token: 'font-display text-xs',   variable: 'DisplayFont, size/xs',        value: 'Bricolage 12px' },
    { property: 'Date Text',       token: 'text-text-tertiary',     variable: 'Base/Base - 400 (188d3920…)', value: '#818696' },
    { property: 'Duration Text',   token: 'text-text-on-brand',     variable: 'Text/On-brand',               value: '#FFFFFF' },
    { property: 'Active Badge BG', token: 'bg-brand',               variable: 'Brand/Primary (1770EF)',      value: '#1770EF' },
    { property: 'Radius',          token: 'rounded-m',              variable: 'radius/m',                    value: '8px' },
  ],
}
