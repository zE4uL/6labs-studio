import type { Meta, StoryObj } from '@storybook/react-vite'
import { EventTypeTag } from './EventTypeTag'

const EVENT_TYPES = ['kill', 'winner', 'loading-error', 'customization', 'match-start', 'death', 'loot']

const meta = {
  title: 'Atoms/EventTypeTag',
  component: EventTypeTag,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: EVENT_TYPES },
  },
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
} satisfies Meta<typeof EventTypeTag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'kill',
  },
}

export const AllTypes: Story = {
  name: 'All Types',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 16 }}>
      {EVENT_TYPES.map((t) => (
        <EventTypeTag key={t} type={t} />
      ))}
    </div>
  ),
}
