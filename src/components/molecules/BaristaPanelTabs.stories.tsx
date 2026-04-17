import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { BaristaPanelTabs, type BaristaPanelTab } from './BaristaPanelTabs'

const meta = {
  title: 'Molecules/BaristaPanelTabs',
  component: BaristaPanelTabs,
  tags: ['autodocs'],
  argTypes: {
    active: { control: 'select', options: ['assist', 'tasks'] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320, border: '1px solid #e6e7ea', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BaristaPanelTabs>
export default meta
type Story = StoryObj<typeof meta>

export const AssistActive: Story = { args: { active: 'assist' } }
export const TasksActive: Story = { args: { active: 'tasks' } }

export const Interactive: Story = {
  args: { active: 'assist' },
  render: () => {
    const [tab, setTab] = useState<BaristaPanelTab>('assist')
    return <BaristaPanelTabs active={tab} onChange={setTab} />
  },
}
