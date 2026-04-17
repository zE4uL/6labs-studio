import type { Meta, StoryObj } from '@storybook/react-vite'
import { SelectDropdown } from './SelectDropdown'

const meta = {
  title: 'Molecules/SelectDropdown',
  component: SelectDropdown,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  argTypes: {
    title: { control: 'text' },
    value: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 280 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SelectDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    groups: [
      {
        items: [
          { value: 'all', label: 'All Events' },
          { value: 'combat', label: 'Combat' },
          { value: 'progression', label: 'Progression' },
          { value: 'monetization', label: 'Monetization' },
          { value: 'technical', label: 'Technical' },
        ],
      },
    ],
    onChange: () => {},
  },
}

export const WithGroups: Story = {
  args: {
    title: 'Select Filter',
    groups: [
      {
        header: 'Event Categories',
        items: [
          { value: 'combat', label: 'Combat', icon: '\u2694\uFE0F' },
          { value: 'progression', label: 'Progression', icon: '\uD83C\uDFC6' },
          { value: 'monetization', label: 'Monetization', icon: '\uD83D\uDCB0' },
        ],
      },
      {
        header: 'Player Behavior',
        items: [
          { value: 'frustration', label: 'Frustration', icon: '\uD83D\uDE24' },
          { value: 'engagement', label: 'Engagement', icon: '\uD83D\uDD25' },
          { value: 'idle', label: 'Idle', icon: '\uD83D\uDCA4', disabled: true },
        ],
      },
    ],
    onChange: () => {},
  },
}

export const WithSelectedValue: Story = {
  args: {
    groups: [
      {
        items: [
          { value: 'fortnite', label: 'Fortnite' },
          { value: 'apex', label: 'Apex Legends' },
          { value: 'valorant', label: 'Valorant' },
          { value: 'lol', label: 'League of Legends' },
        ],
      },
    ],
    value: 'apex',
    onChange: () => {},
  },
}
