import type { Meta, StoryObj } from '@storybook/react-vite'
import { BaristaTaskItem } from './BaristaTaskItem'
import type { BaristaTask } from '../../state/BaristaContext'

const baseTask: BaristaTask = {
  id: 'task-demo',
  name: 'Weekly churn summary',
  prompt:
    'Flag players at risk of churning this week and surface the top 3 behavioural predictors across cohorts.',
  frequency: 'weekly',
  scheduledAt: new Date().toISOString(),
  timezone: 'Asia/Calcutta',
  enabled: true,
  status: 'success',
  lastRunAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  results: [],
}

const meta = {
  title: 'Molecules/BaristaTaskItem',
  component: BaristaTaskItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 288, padding: 16, backgroundColor: '#fff' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BaristaTaskItem>
export default meta
type Story = StoryObj<typeof meta>

export const Active: Story = {
  args: { task: { ...baseTask, enabled: true, status: 'success' } },
}
export const Scheduled: Story = {
  args: { task: { ...baseTask, status: 'scheduled', lastRunAt: undefined } },
}
export const Paused: Story = {
  args: { task: { ...baseTask, enabled: false, status: 'paused' } },
}
