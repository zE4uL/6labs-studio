import type { Meta, StoryObj } from '@storybook/react-vite'
import { BaristaProfileWidget } from './BaristaProfileWidget'

const meta = {
  title: 'Molecules/BaristaProfileWidget',
  component: BaristaProfileWidget,
  tags: ['autodocs'],
  argTypes: {
    summary: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, width: 300, backgroundColor: '#fff' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BaristaProfileWidget>
export default meta
type Story = StoryObj<typeof meta>

const summary =
  'You are assisting a Design Lead focused on competitor benchmarking, prioritizing questions about player behaviors, design patterns, and decision-making trends observed across games.'

export const Default: Story = { args: { summary } }
export const WithActions: Story = {
  args: { summary, onEdit: () => {}, onDelete: () => {} },
  name: 'With hover actions (Variant2)',
}
