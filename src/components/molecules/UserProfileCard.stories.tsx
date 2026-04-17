import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserProfileCard } from './UserProfileCard'
import type { UserProfile } from '../../lib/types/radiologist'

const mockProfile: UserProfile = {
  username: 'xDragonSlayer99',
  spenderTag: 'Minnow',
  stats: [
    [
      { icon: 'location', label: 'Location', value: 'Indonesia' },
      { icon: 'radar', label: 'Accuracy', value: '67.3%' },
    ],
    [
      { icon: 'clock', label: 'Avg. Session', value: '24 min' },
      { icon: 'gamepad', label: 'Matches', value: '1,847' },
    ],
    [
      { icon: 'leagues', label: 'League', value: 'Diamond II' },
      { icon: 'dollar', label: 'Spend', value: '$42.00', locked: true },
    ],
  ],
}

const meta = {
  title: 'Molecules/UserProfileCard',
  component: UserProfileCard,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UserProfileCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    profile: mockProfile,
  },
}
