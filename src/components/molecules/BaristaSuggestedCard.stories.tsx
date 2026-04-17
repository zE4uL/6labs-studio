import type { Meta, StoryObj } from '@storybook/react-vite'
import { BaristaSuggestedCard } from './BaristaSuggestedCard'

const meta = {
  title: 'Molecules/BaristaSuggestedCard',
  component: BaristaSuggestedCard,
  tags: ['autodocs'],
  argTypes: {
    question: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320, border: '1px solid #e6e7ea', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BaristaSuggestedCard>
export default meta
type Story = StoryObj<typeof meta>

const question =
  'Among new Bermuda Battle Royale players who show high looting efficiency and aggressive playstyles but still quit mid-match, what are the specific frustration markers and combat events that precede their exit?'

export const Default: Story = {
  args: {
    question,
    onSend: () => {},
    onEdit: () => {},
    onTryAnother: () => {},
  },
}
