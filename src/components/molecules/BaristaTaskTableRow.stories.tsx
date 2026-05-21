import type { Meta, StoryObj } from '@storybook/react-vite'
import { BaristaTaskTableRow } from './BaristaTaskTableRow'
import type { BaristaTask } from '../../state/BaristaContext'

const GRID = 'minmax(200px, 2fr) 1.4fr 1fr 1.2fr 140px'

function makeTask(overrides: Partial<BaristaTask> = {}): BaristaTask {
  return {
    id: 'task-demo',
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

function TableShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 960,
        margin: 24,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: 'var(--bg-elements)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: GRID,
          columnGap: 16,
          padding: '14px 20px',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        {['Task', 'Schedule', 'Status', 'Last run', 'Actions'].map((c, i) => (
          <span
            key={c}
            style={{
              fontFamily: 'Bricolage_Grotesque, sans-serif',
              fontWeight: 600,
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              color: 'var(--text-tertiary)',
              textAlign: i === 4 ? 'right' : 'left',
            }}
          >
            {c}
          </span>
        ))}
      </div>
      {children}
    </div>
  )
}

const meta = {
  title: 'Molecules/BaristaTaskTableRow',
  component: BaristaTaskTableRow,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof BaristaTaskTableRow>
export default meta
type Story = StoryObj<typeof meta>

export const ActiveDaily: Story = {
  args: {
    task: makeTask(),
    gridTemplate: GRID,
    isLast: true,
    onOpen: () => {},
    onRun: () => {},
    onEdit: () => {},
    onDelete: () => {},
  },
  render: (args) => (
    <TableShell>
      <BaristaTaskTableRow {...args} />
    </TableShell>
  ),
}

export const Paused: Story = {
  args: {
    task: makeTask({ enabled: false, name: 'Daily Update' }),
    gridTemplate: GRID,
    isLast: true,
    onOpen: () => {},
    onRun: () => {},
    onEdit: () => {},
    onDelete: () => {},
  },
  render: (args) => (
    <TableShell>
      <BaristaTaskTableRow {...args} />
    </TableShell>
  ),
}

export const NeverRun: Story = {
  args: {
    task: makeTask({
      name: 'Weekly Sentiment',
      frequency: 'weekly',
      lastRunAt: undefined,
      status: 'scheduled',
    }),
    gridTemplate: GRID,
    isLast: true,
    onOpen: () => {},
    onRun: () => {},
    onEdit: () => {},
    onDelete: () => {},
  },
  render: (args) => (
    <TableShell>
      <BaristaTaskTableRow {...args} />
    </TableShell>
  ),
}

export const MultipleStates: Story = {
  name: 'Multiple States',
  args: {
    task: makeTask(),
    gridTemplate: GRID,
    onOpen: () => {},
    onRun: () => {},
    onEdit: () => {},
    onDelete: () => {},
  },
  render: () => (
    <TableShell>
      <BaristaTaskTableRow
        task={makeTask({ name: 'Daily Update', status: 'success' })}
        gridTemplate={GRID}
        onOpen={() => {}}
        onRun={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
      <BaristaTaskTableRow
        task={makeTask({
          name: 'Ranked Meta Watch',
          frequency: 'every-weekday',
          enabled: false,
        })}
        gridTemplate={GRID}
        onOpen={() => {}}
        onRun={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
      <BaristaTaskTableRow
        task={makeTask({
          name: 'Monthly Churn Digest',
          frequency: 'monthly',
          status: 'error',
        })}
        gridTemplate={GRID}
        isLast
        onOpen={() => {}}
        onRun={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </TableShell>
  ),
}
