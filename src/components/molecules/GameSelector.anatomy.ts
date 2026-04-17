import type { ComponentMeta } from '../../design-system/types'
import { GameSelector } from './GameSelector'

export const meta: ComponentMeta = {
  id: 'game-selector',
  label: 'GameSelector',
  category: 'molecules',
  description: 'Game selection card with icon, name, and genre. Supports default (sidebar) and list (dropdown) variants.',
  component: GameSelector,
  anatomy: [],
  renderHints: {
    groups: [
      { label: 'Variants', prop: 'variant' },
    ],
    defaultProps: { name: 'Free Fire', genre: 'Action' },
  },
}
