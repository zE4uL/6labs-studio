import type { Meta, StoryObj } from '@storybook/react-vite'
import { BaristaTasksView } from './BaristaTasksView'
import type { BaristaTask } from '../../state/BaristaContext'

const sampleTasks: BaristaTask[] = [
  {
    id: 'task-1',
    name: 'Weekly churn summary',
    prompt: 'Flag players at risk and list top predictors.',
    frequency: 'weekly',
    scheduledAt: new Date().toISOString(),
    timezone: 'Asia/Calcutta',
    enabled: true,
    status: 'success',
    lastRunAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    results: [],
  },
  {
    id: 'task-2',
    name: 'Daily matchmaking anomalies',
    prompt: 'Surface queue-time spikes and unusual rage-quit patterns each day.',
    frequency: 'daily',
    scheduledAt: new Date().toISOString(),
    timezone: 'Asia/Calcutta',
    enabled: false,
    status: 'paused',
    createdAt: new Date().toISOString(),
    results: [],
  },
]

const meta = {
  title: 'Organisms/BaristaTasksView',
  component: BaristaTasksView,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 320, border: '1px solid #e6e7ea', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BaristaTasksView>
export default meta
type Story = StoryObj<typeof meta>

const noop = () => {}

export const Empty: Story = {
  args: {
    tasks: [],
    onCreate: noop,
    onOpenTask: noop,
    onRunTask: noop,
    onEditTask: noop,
    onToggleTask: noop,
    onManage: noop,
  },
}

export const Active: Story = {
  args: {
    tasks: sampleTasks,
    onCreate: noop,
    onOpenTask: noop,
    onRunTask: noop,
    onEditTask: noop,
    onToggleTask: noop,
    onManage: noop,
  },
}
