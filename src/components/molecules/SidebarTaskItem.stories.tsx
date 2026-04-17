import type { Meta, StoryObj } from '@storybook/react-vite'
import { SidebarTaskItem } from './SidebarTaskItem'

const meta = {
  title: 'Molecules/SidebarTaskItem',
  component: SidebarTaskItem,
  tags: ['autodocs'],
  argTypes: {
    query: { control: 'text' },
    active: { control: 'boolean' },
    state: { control: 'select', options: ['default', 'loading', 'complete'] },
  },
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 240, backgroundColor: 'var(--bg-elements)', padding: 8, borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SidebarTaskItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    query: 'Show me players who got booyah',
  },
}

export const Active: Story = {
  args: {
    query: 'Show me kill highlights from ranked',
    active: true,
  },
}

export const Loading: Story = {
  args: {
    query: 'Analyzing session replay data...',
    state: 'loading',
  },
}

export const Complete: Story = {
  args: {
    query: 'Found 12 kill events in session',
    state: 'complete',
  },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <SidebarTaskItem query="Show me players who got booyah" />
      <SidebarTaskItem query="Show me kill highlights from ranked" active />
      <SidebarTaskItem query="Analyzing session replay data..." state="loading" />
      <SidebarTaskItem query="Found 12 kill events in session" state="complete" />
    </div>
  ),
}
