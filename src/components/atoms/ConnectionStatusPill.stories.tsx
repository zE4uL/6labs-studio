import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConnectionStatusPill } from './ConnectionStatusPill'

const meta = {
  title: 'Atoms/ConnectionStatusPill',
  component: ConnectionStatusPill,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['connected', 'disconnected'] },
    verdict: { control: 'select', options: ['GREEN', 'YELLOW', 'RED', undefined] },
    label: { control: 'text' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ConnectionStatusPill>
export default meta
type Story = StoryObj<typeof meta>

export const Connected: Story = { args: { variant: 'connected' } }
export const Disconnected: Story = { args: { variant: 'disconnected' } }

export const VerdictGreen: Story = {
  name: 'Verdict / GREEN → Connected',
  args: { verdict: 'GREEN' },
}
export const VerdictYellow: Story = {
  name: 'Verdict / YELLOW → Connected (collapsed)',
  args: { verdict: 'YELLOW' },
}
export const VerdictRed: Story = {
  name: 'Verdict / RED → Not connected',
  args: { verdict: 'RED' },
}

export const AllStates: Story = {
  name: 'All States',
  args: { variant: 'connected' },
  render: () => (
    <div style={{ display: 'flex', gap: 8, padding: 16 }}>
      <ConnectionStatusPill variant="connected" />
      <ConnectionStatusPill variant="disconnected" />
    </div>
  ),
}
