import type { Meta, StoryObj } from '@storybook/react-vite'
import { TaskStatusPill } from './TaskStatusPill'

const meta = {
  title: 'Atoms/TaskStatusPill',
  component: TaskStatusPill,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['active', 'scheduled', 'paused'] },
    label: { control: 'text' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TaskStatusPill>
export default meta
type Story = StoryObj<typeof meta>

export const Active: Story = { args: { variant: 'active' } }
export const Scheduled: Story = { args: { variant: 'scheduled' } }
export const Paused: Story = { args: { variant: 'paused' } }

export const AllStates: Story = {
  name: 'All States',
  args: { variant: 'active' },
  render: () => (
    <div style={{ display: 'flex', gap: 8, padding: 16 }}>
      <TaskStatusPill variant="active" />
      <TaskStatusPill variant="scheduled" />
      <TaskStatusPill variant="paused" />
    </div>
  ),
}
