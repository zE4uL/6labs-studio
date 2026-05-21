import type { Meta, StoryObj } from '@storybook/react-vite'
import { BaristaTaskTable } from './BaristaTaskTable'
import type { BaristaTask } from '../../state/BaristaContext'

function makeTask(overrides: Partial<BaristaTask> = {}): BaristaTask {
  return {
    id: `task-${Math.random().toString(36).slice(2, 8)}`,
    name: 'Daily Update',
    prompt: 'Summarize today’s key player insights.',
    frequency: 'daily',
    scheduledAt: '16:00',
    timezone: 'UTC',
    enabled: true,
    status: 'success',
    lastRunAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    results: [],
    ...overrides,
  }
}

const meta = {
  title: 'Organisms/BaristaTaskTable',
  component: BaristaTaskTable,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ padding: 32, maxWidth: 1024, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BaristaTaskTable>
export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    tasks: [],
    onOpenTask: () => {},
    onRunTask: () => {},
    onEditTask: () => {},
    onDeleteTask: () => {},
  },
}

export const SingleRow: Story = {
  args: {
    tasks: [makeTask({ name: 'Daily Update', enabled: false })],
    onOpenTask: () => {},
    onRunTask: () => {},
    onEditTask: () => {},
    onDeleteTask: () => {},
  },
}

export const Populated: Story = {
  args: {
    tasks: [
      makeTask({ name: 'Daily Update', status: 'success' }),
      makeTask({
        name: 'Ranked Meta Watch',
        frequency: 'every-weekday',
        enabled: false,
      }),
      makeTask({
        name: 'Weekly Sentiment Digest',
        frequency: 'weekly',
        lastRunAt: undefined,
        status: 'scheduled',
      }),
      makeTask({
        name: 'Monthly Churn Snapshot',
        frequency: 'monthly',
        status: 'error',
      }),
    ],
    onOpenTask: () => {},
    onRunTask: () => {},
    onEditTask: () => {},
    onDeleteTask: () => {},
  },
}
