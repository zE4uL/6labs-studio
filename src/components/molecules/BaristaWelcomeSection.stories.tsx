import type { Meta, StoryObj } from '@storybook/react-vite'
import { BaristaWelcomeSection } from './BaristaWelcomeSection'

const meta = {
  title: 'Molecules/BaristaWelcomeSection',
  component: BaristaWelcomeSection,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['onboarding', 'profile-ready'] },
    personaSummary: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320, border: '1px solid #e6e7ea', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BaristaWelcomeSection>
export default meta
type Story = StoryObj<typeof meta>

export const Onboarding: Story = { args: { state: 'onboarding' } }
export const ProfileReady: Story = {
  args: {
    state: 'profile-ready',
    personaSummary:
      'You are assisting a Design Lead focused on competitor benchmarking, prioritizing questions about player behaviors, design patterns, and decision-making trends observed across games.',
    onEditPersona: () => {},
    onDeletePersona: () => {},
  },
}
