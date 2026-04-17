import type { ComponentMeta } from '../../design-system/types'

export const meta: ComponentMeta = {
  id: 'hero-section',
  label: 'HeroSection',
  category: 'organisms',
  description: 'Top-of-page banner with heading, subtitle, and agent tab bar.',
  anatomy: [
    { property: 'Heading',              token: 'font-display text-4xl',  variable: 'DisplayFont, size/4xl',      value: 'Bricolage 36px' },
    { property: 'Heading Color',        token: 'text-text-primary',      variable: 'Base/Base - 900 (60221769…)', value: '#030D2D' },
    { property: 'Subtitle',             token: 'text-text-secondary',    variable: 'Base/Base - 600 (0a2933ab…)', value: '#4F566C' },
    { property: 'Section Padding',      token: 'py-xxl px-xxl',          variable: 'space/xxl',                  value: '32px' },
  ],
}
