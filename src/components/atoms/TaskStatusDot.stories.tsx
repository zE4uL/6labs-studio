import type { Meta, StoryObj } from '@storybook/react-vite'
import { TaskStatusDot } from './TaskStatusDot'

const meta = {
  title: 'Atoms/TaskStatusDot',
  component: TaskStatusDot,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['active', 'scheduled', 'running', 'success', 'error', 'paused'],
    },
    size: { control: { type: 'number', min: 4, max: 16 } },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TaskStatusDot>
export default meta
type Story = StoryObj<typeof meta>

export const Active: Story = { args: { variant: 'active' } }
export const Running: Story = { args: { variant: 'running' } }
export const Success: Story = { args: { variant: 'success' } }
export const Error: Story = { args: { variant: 'error' } }
export const Paused: Story = { args: { variant: 'paused' } }

export const AllVariants: Story = {
  name: 'All Variants',
  args: { variant: 'active' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16 }}>
      {(['active', 'scheduled', 'running', 'success', 'error', 'paused'] as const).map(
        (v) => (
          <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <TaskStatusDot variant={v} />
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: 13,
                color: 'var(--text-secondary)',
                textTransform: 'capitalize',
              }}
            >
              {v}
            </span>
          </div>
        )
      )}
    </div>
  ),
}
