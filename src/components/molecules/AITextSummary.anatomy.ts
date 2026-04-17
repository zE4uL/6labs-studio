import type { ComponentMeta } from '../../design-system/types'
import { AITextSummary } from './AITextSummary'

export const meta: ComponentMeta = {
  id: 'ai-text-summary',
  label: 'AITextSummary',
  category: 'molecules',
  description: 'AI-generated text summary with sparkle icon and keyword highlighting in brand color.',
  component: AITextSummary,
  anatomy: [
    { property: 'Heading',          token: 'font-display text-s',    variable: 'DisplayFont, size/s',         value: 'Bricolage 14px' },
    { property: 'Body Text',        token: 'text-text-secondary',    variable: 'Base/Base - 600 (0a2933ab…)', value: '#4F566C' },
    { property: 'Sparkle Icon',     token: 'text-brand',             variable: 'Brand/Primary (1770EF)',      value: '#1770EF' },
    { property: 'Highlight BG',     token: 'bg-bg-tint-light',       variable: 'Background/Tint-light',       value: 'rgba(23,112,239,0.08)' },
    { property: 'Highlight Text',   token: 'text-brand',             variable: 'Brand/Primary (1770EF)',      value: '#1770EF' },
  ],
}
