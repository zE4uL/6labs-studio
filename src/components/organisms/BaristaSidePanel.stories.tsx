import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { BaristaSidePanel, type BaristaTurn } from './BaristaSidePanel'
import type { BaristaActiveTab, BaristaTask } from '../../state/BaristaContext'

const personaSummary =
  'You are assisting a Design Lead focused on competitor benchmarking, prioritizing questions about player behaviors, design patterns, and decision-making trends observed across games.'

const sampleTurns: BaristaTurn[] = [
  {
    id: 't1',
    turnNumber: 1,
    status: 'success',
    question: 'How does Free Fire Max perform against its competitors?',
    timestamp: '4:07 PM',
  },
]

const sampleTasks: BaristaTask[] = [
  {
    id: 'task-1',
    name: 'Weekly churn summary',
    prompt: 'Flag players at risk this week and list the top predictors.',
    frequency: 'weekly',
    scheduledAt: new Date().toISOString(),
    timezone: 'Asia/Calcutta',
    enabled: true,
    status: 'success',
    lastRunAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    results: [],
  },
]

const meta = {
  title: 'Organisms/BaristaSidePanel',
  component: BaristaSidePanel,
  decorators: [
    (Story) => (
      <div style={{ height: 820, display: 'flex', alignItems: 'stretch' }}>
        <Story />
      </div>
    ),
  ],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof BaristaSidePanel>
export default meta
type Story = StoryObj<typeof meta>

const defaults = {
  activeTab: 'assist' as BaristaActiveTab,
  onTabChange: () => {},
  autoMode: false,
  onAutoModeChange: () => {},
}

export const Onboarding: Story = {
  args: {
    ...defaults,
    state: 'onboarding',
    onSetup: () => {},
    onClose: () => {},
  },
}

export const ProfileReady: Story = {
  args: {
    ...defaults,
    state: 'profile-ready',
    personaSummary,
    onStartBarista: () => {},
    onReset: () => {},
    onEditPersona: () => {},
    onClose: () => {},
  },
}

export const Approve: Story = {
  args: {
    ...defaults,
    state: 'approve',
    suggestedQuestion:
      'What are the top frustration markers in the last week of Bermuda Battle Royale sessions?',
    turns: sampleTurns,
    onSendSuggested: () => {},
    onEditSuggested: () => {},
    onTryAnother: () => {},
    onReset: () => {},
    onClose: () => {},
  },
}

export const Running: Story = {
  args: {
    ...defaults,
    state: 'running',
    autoMode: true,
    turns: [{ ...sampleTurns[0], status: 'running' }],
    onStop: () => {},
    onReset: () => {},
    onClose: () => {},
  },
}

export const Paused: Story = {
  args: {
    ...defaults,
    state: 'paused',
    turns: [
      {
        ...sampleTurns[0],
        status: 'paused',
        pausedReason: 'Stopped because you switched screens',
      },
    ],
    onStartBarista: () => {},
    onReset: () => {},
    onClose: () => {},
  },
}

export const TasksEmpty: Story = {
  args: {
    ...defaults,
    activeTab: 'tasks',
    state: 'profile-ready',
    tasks: [],
    onCreateTask: () => {},
    onClose: () => {},
  },
}

export const TasksActive: Story = {
  args: {
    ...defaults,
    activeTab: 'tasks',
    state: 'profile-ready',
    tasks: sampleTasks,
    onOpenTask: () => {},
    onRunTask: () => {},
    onEditTask: () => {},
    onToggleTask: () => {},
    onCreateTask: () => {},
    onClose: () => {},
  },
}

export const Interactive: Story = {
  args: { ...defaults, state: 'profile-ready' },
  render: () => {
    const [tab, setTab] = useState<BaristaActiveTab>('assist')
    const [auto, setAuto] = useState(false)
    return (
      <BaristaSidePanel
        state="profile-ready"
        activeTab={tab}
        onTabChange={setTab}
        autoMode={auto}
        onAutoModeChange={setAuto}
        personaSummary={personaSummary}
        tasks={sampleTasks}
        onStartBarista={() => {}}
        onClose={() => {}}
      />
    )
  },
}
