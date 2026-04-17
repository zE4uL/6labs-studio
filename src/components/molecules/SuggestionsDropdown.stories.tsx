import type { Meta, StoryObj } from '@storybook/react-vite'
import { SuggestionsDropdown } from './SuggestionsDropdown'

const meta = {
  title: 'Molecules/SuggestionsDropdown',
  component: SuggestionsDropdown,
  tags: ['autodocs'],
  args: {
    onSelect: () => {},
  },
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SuggestionsDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
