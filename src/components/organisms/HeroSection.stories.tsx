import type { Meta, StoryObj } from '@storybook/react-vite'
import { HeroSection } from './HeroSection'

const meta = {
  title: 'Organisms/HeroSection',
  component: HeroSection,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 960, margin: '0 auto', padding: 40 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroSection>

export default meta
type Story = StoryObj<typeof meta>

/** Default state with Radiologist pre-selected. */
export const Default: Story = {}

/** Oracle tab active via controlled prop. */
export const WithActiveAgent: Story = {
  args: {
    activeAgent: 'oracle',
  },
}
