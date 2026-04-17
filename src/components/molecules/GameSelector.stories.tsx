import type { Meta, StoryObj } from '@storybook/react-vite'
import { GameSelector } from './GameSelector'

const meta = {
  title: 'Molecules/GameSelector',
  component: GameSelector,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  argTypes: {
    name: { control: 'text' },
    genre: { control: 'text' },
    imageUrl: { control: 'text' },
    variant: { control: 'select', options: ['default', 'list'] },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 260 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GameSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Fortnite',
    genre: 'Battle Royale',
    imageUrl: 'https://placehold.co/40x40/1f1637/7B4CFF?text=FN',
  },
}

export const ListVariant: Story = {
  args: {
    name: 'Apex Legends',
    genre: 'FPS Battle Royale',
    imageUrl: 'https://placehold.co/40x40/1f1637/C20568?text=AL',
    variant: 'list',
  },
}
