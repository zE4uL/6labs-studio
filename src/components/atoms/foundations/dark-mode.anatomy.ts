import type { ComponentMeta } from '../../../design-system/types'

export const meta: ComponentMeta = {
  id: 'dark-mode',
  label: 'Dark Mode Mapping',
  category: 'foundations',
  description: 'Light/dark token mode mappings for key semantic tokens.',
  anatomy: [
    { property: 'Background/Page BG',  token: 'bg-bg-page',       variable: '9cf5e54d… (Light: Surface, Dark: Base-910)', value: '#F1F1F1 → #1A2236' },
    { property: 'Background/Card',     token: 'bg-bg-elements',   variable: '2910233d… (Light: White, Dark: Base-925)',   value: '#FFFFFF → #111827' },
    { property: 'Text/Primary',        token: 'text-text-primary', variable: 'Text/Primary → Base-900 / White',           value: '#030D2D → #FFFFFF' },
    { property: 'Text/Secondary',      token: 'text-text-secondary', variable: 'Text/Secondary → Base-600 / Base-300',   value: '#4F566C → #9A9EAB' },
    { property: 'Border/Default',      token: 'border-border-default', variable: 'Border/Default → Base-100 / White-12', value: '#CDCFD5 → rgba(255,255,255,0.12)' },
  ],
}
