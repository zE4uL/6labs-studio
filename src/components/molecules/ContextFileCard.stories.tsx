import type { Meta, StoryObj } from '@storybook/react-vite'
import { ContextFileCard } from './ContextFileCard'

const meta = {
  title: 'Molecules/ContextFileCard',
  component: ContextFileCard,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  argTypes: {
    fileName: { control: 'text' },
    fileSize: { control: 'text' },
    fileDate: { control: 'text' },
    fileType: { control: 'select', options: ['image', 'document'] },
    progress: { control: { type: 'range', min: 0, max: 100 } },
    status: { control: 'select', options: ['uploading', 'uploaded'] },
    saved: { control: 'boolean' },
    savedDescription: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContextFileCard>

export default meta
type Story = StoryObj<typeof meta>

export const Uploading: Story = {
  args: {
    fileName: 'game-analytics-Q4-report.pdf',
    fileSize: '4.2 MB',
    fileDate: 'Apr 5, 2026',
    fileType: 'document',
    progress: 45,
    status: 'uploading',
  },
}

export const Uploaded: Story = {
  args: {
    fileName: 'player-heatmap-dust2.png',
    fileSize: '1.8 MB',
    fileDate: 'Apr 5, 2026',
    fileType: 'image',
    progress: 100,
    status: 'uploaded',
  },
}

export const Saved: Story = {
  args: {
    fileName: 'match-strategy-notes.docx',
    fileSize: '320 KB',
    fileDate: 'Apr 3, 2026',
    fileType: 'document',
    progress: 100,
    status: 'uploaded',
    saved: true,
    savedDescription:
      'Detailed notes on ranked match strategies including drop zones, rotations, and loadout preferences for competitive play.',
  },
}
