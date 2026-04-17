import type { Meta, StoryObj } from '@storybook/react-vite'
import { FilterDialog } from './FilterDialog'

const meta = {
  title: 'Organisms/FilterDialog',
  component: FilterDialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: { inline: false, iframeHeight: 700 },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 800, position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FilterDialog>

export default meta
type Story = StoryObj<typeof meta>

/** Dialog open with some pre-selected filters. */
export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onApply: () => {},
    initialFilters: {
      gameModes: ['Battle Royale', 'Clash Squad'],
      maps: ['Bermuda'],
      placements: ['Winner', 'Top 3'],
      killsMin: 5,
      killsMax: 20,
    },
  },
}
