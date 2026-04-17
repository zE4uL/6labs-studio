import type { ComponentMeta } from '../../design-system/types'
import { VideoPlayerThumbnail } from './VideoPlayerThumbnail'

export const meta: ComponentMeta = {
  id: 'video-player-thumbnail',
  label: 'VideoPlayerThumbnail',
  category: 'molecules',
  description: 'Video thumbnail with centered play button, duration badge, and dot indicators.',
  component: VideoPlayerThumbnail,
  anatomy: [
    { property: 'Radius',         token: 'rounded-xl',             variable: 'radius/xl',                   value: '12px' },
    { property: 'Play Btn BG',    token: 'bg-white/80',            variable: 'Neutral/White alpha-80',      value: 'rgba(255,255,255,0.8)' },
    { property: 'Duration Text',  token: 'text-text-on-brand',     variable: 'Text/On-brand',               value: '#FFFFFF' },
    { property: 'Active Dot',     token: 'bg-brand',               variable: 'Brand/Primary (1770EF)',      value: '#1770EF' },
    { property: 'Inactive Dot',   token: 'bg-base-300',            variable: 'Base/300',                    value: '#D1D5DB' },
  ],
}
