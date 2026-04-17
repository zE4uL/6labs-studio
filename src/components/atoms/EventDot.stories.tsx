import type { Meta, StoryObj } from '@storybook/react-vite'
import { EventDot, EVENT_DOT_COLORS } from './EventDot'

const meta = {
  title: 'Atoms/EventDot',
  component: EventDot,
  tags: ['autodocs'],
  argTypes: {
    category: {
      control: 'select',
      options: Object.keys(EVENT_DOT_COLORS),
    },
    position: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    label: { control: 'text' },
    timestamp: { control: 'text' },
  },
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: 40, width: '100%', maxWidth: 600, margin: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EventDot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    category: 'Combat',
    position: 50,
    label: 'Player eliminated enemy',
    timestamp: '02:34',
  },
}

export const AllCategories: Story = {
  name: 'All Categories',
  render: () => {
    const categories = Object.keys(EVENT_DOT_COLORS)
    return (
      <div style={{ position: 'relative', height: 48, width: '100%', maxWidth: 600 }}>
        {/* Track line */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: 'var(--border-subtle)',
            transform: 'translateY(-50%)',
          }}
        />
        {categories.map((cat, i) => (
          <EventDot
            key={cat}
            category={cat}
            position={10 + i * (80 / (categories.length - 1))}
            label={cat}
            timestamp={`0${i + 1}:00`}
          />
        ))}
      </div>
    )
  },
}
