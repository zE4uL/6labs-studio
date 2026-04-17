import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgressBar } from './ProgressBar'

const meta = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = { args: { value: 0 } }
export const Quarter: Story = { args: { value: 25 } }
export const Half: Story = { args: { value: 50 } }
export const Complete: Story = { args: { value: 100 } }

export const AllSteps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      {[0, 25, 50, 75, 100].map((v) => (
        <div key={v}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{v}%</span>
          <ProgressBar value={v} />
        </div>
      ))}
    </div>
  ),
}
