import type { ComponentMeta } from '../../design-system/types'
import { UserProfileCard } from './UserProfileCard'

export const meta: ComponentMeta = {
  id: 'user-profile-card',
  label: 'UserProfileCard',
  category: 'molecules',
  description: 'Avatar + username display card for session user profile with fallback initial.',
  component: UserProfileCard,
  anatomy: [
    { property: 'Card Border',     token: 'border-border-subtle',   variable: 'Border/Subtle',               value: '#E6E7EA' },
    { property: 'Username',        token: 'font-display text-s',    variable: 'DisplayFont, size/s',         value: 'Bricolage 14px' },
    { property: 'Player ID',       token: 'text-text-tertiary',     variable: 'Base/Base - 400 (188d3920…)', value: '#818696' },
    { property: 'Avatar Fallback', token: 'bg-brand',               variable: 'Brand/Primary (1770EF)',      value: '#1770EF' },
    { property: 'Radius',          token: 'rounded-xl',             variable: 'radius/xl',                   value: '12px' },
  ],
}
