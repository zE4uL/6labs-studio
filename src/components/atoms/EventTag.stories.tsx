import type { Meta, StoryObj } from '@storybook/react-vite'
import { EventTag } from './EventTag'

const meta = {
  title: 'Atoms/EventTag',
  component: EventTag,
  tags: ['autodocs'],
} satisfies Meta<typeof EventTag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Kill' },
}

export const LongLabel: Story = {
  args: { label: 'Zone Rotation' },
}

export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {['Kill', 'Death', 'Loot', 'Zone Rotation', 'Gloo Wall', 'Headshot'].map((l) => (
        <EventTag key={l} label={l} />
      ))}
    </div>
  ),
}
