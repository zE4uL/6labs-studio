import type { ComponentMeta } from '../../design-system/types'
import { SuggestionsDropdown } from './SuggestionsDropdown'

export const meta: ComponentMeta = {
  id: 'suggestions-dropdown',
  label: 'SuggestionsDropdown',
  category: 'molecules',
  description: 'Prompt suggestions panel below the input console with clickable suggestion rows.',
  component: SuggestionsDropdown,
  anatomy: [
    { property: 'Card BG',        token: 'bg-bg-elements',         variable: 'Neutral/White (3edd2c47…)',   value: '#FFFFFF' },
    { property: 'Card Border',     token: 'border-border-default',  variable: 'Border/Default',              value: '#E6E7EA' },
    { property: 'Section Label',   token: 'text-text-tertiary',     variable: 'Base/Base - 400 (188d3920…)', value: '#818696' },
    { property: 'Suggestion Text', token: 'text-text-secondary',    variable: 'Base/Base - 600 (0a2933ab…)', value: '#4F566C' },
    { property: 'Radius',          token: 'rounded-xl',             variable: 'radius/xl',                   value: '12px' },
  ],
}
