import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatCard } from './StatCard'

const meta = {
  title: 'Atoms/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    variant: { control: 'select', options: ['default', 'success', 'error'] },
  },
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 160, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Avg Session', value: '14m 32s', variant: 'default' },
}

export const Success: Story = {
  args: { label: 'Win Rate', value: '68%', variant: 'success' },
}

export const Error: Story = {
  args: { label: 'Crash Rate', value: '12%', variant: 'error' },
}

export const WithIcon: Story = {
  args: {
    label: 'Kills',
    value: '24',
    variant: 'success',
    icon: (
      <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
        <path d="M10 2L12.5 7.5H17.5L13.5 11L15 17L10 13.5L5 17L6.5 11L2.5 7.5H7.5L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 12, padding: 16, maxWidth: 520 }}>
      <StatCard label="Avg Session" value="14m 32s" variant="default" />
      <StatCard label="Win Rate" value="68%" variant="success" />
      <StatCard label="Crash Rate" value="12%" variant="error" />
    </div>
  ),
}
