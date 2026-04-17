import type { Meta, StoryObj } from '@storybook/react-vite'
import { BaristaTaskDetailPage } from './BaristaTaskDetailPage'
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
  results: [
    {
      id: 'r1',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'success',
      answer:
        'Previous week: 18% of returning players showed 3+ mid-match quits on high-density maps. Monetization drop-off peaked at the second character-unlock prompt.',
    },
    {
      id: 'r2',
      timestamp: new Date().toISOString(),
      status: 'success',
      answer:
        'This week: cohort-level quit rate down 3pp. Queue-time anomalies cluster in APAC peak hours; recommend tightening elo-range tolerance after 30s.',
    },
  ],
}

const meta = {
  title: 'Organisms/BaristaTaskDetailPage',
  component: BaristaTaskDetailPage,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BaristaTaskDetailPage>
export default meta
type Story = StoryObj<typeof meta>

export const WithResults: Story = {
  args: {
    task: baseTask,
    onBack: () => {},
    onBranchInNewChat: () => {},
    onRunNow: () => {},
  },
}

export const EmptyResults: Story = {
  args: {
    task: { ...baseTask, results: [], lastRunAt: undefined, status: 'scheduled' },
    onBack: () => {},
    onBranchInNewChat: () => {},
    onRunNow: () => {},
  },
}

export const Paused: Story = {
  args: {
    task: { ...baseTask, enabled: false },
    onBack: () => {},
    onBranchInNewChat: () => {},
    onRunNow: () => {},
  },
}
