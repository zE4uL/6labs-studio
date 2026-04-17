import type { Meta, StoryObj } from '@storybook/react-vite'
import { BaristaTurnCard } from './BaristaTurnCard'

const meta = {
  title: 'Molecules/BaristaTurnCard',
  component: BaristaTurnCard,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['running', 'paused', 'success', 'warning', 'error'],
    },
    turnNumber: { control: 'number' },
    question: { control: 'text' },
    timestamp: { control: 'text' },
    pausedReason: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 288, padding: 16, backgroundColor: '#fff' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BaristaTurnCard>
export default meta
type Story = StoryObj<typeof meta>

const base = {
  turnNumber: 1,
  question: 'How does Free Fire Max perform against its competitors?',
  timestamp: '4:07 PM',
}

export const Running: Story = { args: { ...base, status: 'running' } }
export const Success: Story = { args: { ...base, status: 'success' } }
export const Warning: Story = { args: { ...base, status: 'warning' } }
export const ErrorState: Story = { args: { ...base, status: 'error' }, name: 'Error' }
export const Paused: Story = {
  args: {
    ...base,
    status: 'paused',
    pausedReason: 'Stopped because you switched screens',
  },
}

export const AllStates: Story = {
  name: 'All States',
  args: { ...base, status: 'running' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <BaristaTurnCard {...base} status="running" />
      <BaristaTurnCard {...base} status="success" />
      <BaristaTurnCard {...base} status="warning" />
      <BaristaTurnCard {...base} status="error" />
      <BaristaTurnCard
        {...base}
        status="paused"
        pausedReason="Stopped because you switched screens"
      />
    </div>
  ),
}
