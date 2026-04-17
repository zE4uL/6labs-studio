import type { Meta, StoryObj } from '@storybook/react-vite'
import { EventPill } from './EventPill'

const CATEGORIES = ['Combat', 'Technical', 'Tap', 'Progression', 'Frustation', 'Monetization', 'Warning']

const meta = {
  title: 'Atoms/EventPill',
  component: EventPill,
  tags: ['autodocs'],
  argTypes: {
    category: { control: 'select', options: CATEGORIES },
    label: { control: 'text' },
  },
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
} satisfies Meta<typeof EventPill>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    category: 'Combat',
  },
}

export const AllCategories: Story = {
  name: 'All Categories',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 16 }}>
      {CATEGORIES.map((cat) => (
        <EventPill key={cat} category={cat} />
      ))}
    </div>
  ),
}
