import type { Meta, StoryObj } from '@storybook/react-vite'
import { GameSelectorDropdown } from './GameSelectorDropdown'

const mockGames = [
  { name: 'Fortnite', genre: 'Battle Royale', imageUrl: 'https://placehold.co/40x40/1f1637/7B4CFF?text=FN' },
  { name: 'Apex Legends', genre: 'FPS Battle Royale', imageUrl: 'https://placehold.co/40x40/1f1637/C20568?text=AL' },
  { name: 'Valorant', genre: 'Tactical Shooter', imageUrl: 'https://placehold.co/40x40/1f1637/1770EF?text=VL' },
  { name: 'League of Legends', genre: 'MOBA', imageUrl: 'https://placehold.co/40x40/1f1637/EAB308?text=LL' },
]

const meta = {
  title: 'Molecules/GameSelectorDropdown',
  component: GameSelectorDropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: { inline: false, iframeHeight: 350 },
    },
    backgrounds: { default: 'Page (Dark)' },
  },
  argTypes: {
    collapsed: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', maxWidth: 280 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GameSelectorDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    games: mockGames,
    collapsed: false,
    onSelect: () => {},
    onClose: () => {},
  },
}
