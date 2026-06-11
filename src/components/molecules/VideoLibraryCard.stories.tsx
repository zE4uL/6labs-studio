import type { Meta, StoryObj } from '@storybook/react-vite'
import { VideoLibraryCard } from './VideoLibraryCard'

const meta = {
  title: 'Molecules/VideoLibraryCard',
  component: VideoLibraryCard,
  tags: ['autodocs'],
  argTypes: {
    layout: { control: 'select', options: ['grid', 'list'] },
    status: { control: 'select', options: ['uploading', 'processing', 'ready', 'failed'] },
    progress: { control: { type: 'range', min: 0, max: 100 } },
    selected: { control: 'boolean' },
    selectionVisible: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 720 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VideoLibraryCard>

export default meta
type Story = StoryObj<typeof meta>

const base = {
  title: 'Bermuda BR — onboarding flow walkthrough.mp4',
  sizeLabel: '184 MB',
  dateLabel: 'Jun 10, 2026',
  progress: 100,
}

export const Ready: Story = {
  args: {
    ...base,
    status: 'ready',
    durationLabel: '4:12',
    tags: ['tutorial', 'onboarding'],
    description:
      'First-session new player path, captured on mid-tier device. Watch for the tutorial skip point.',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
}

export const Uploading: Story = {
  args: {
    ...base,
    title: 'Ranked match — squad wipe at zone 4.mp4',
    status: 'uploading',
    progress: 48,
  },
  decorators: Ready.decorators,
}

export const Analyzing: Story = {
  name: 'Processing (Analyzing)',
  args: {
    ...base,
    title: 'Lobby matchmaking repro — long queue.webm',
    sizeLabel: '96 MB',
    status: 'processing',
    tags: ['matchmaking'],
  },
  decorators: Ready.decorators,
}

export const Failed: Story = {
  args: {
    ...base,
    title: 'Crash repro — checkout screen.mp4',
    sizeLabel: '58 MB',
    status: 'failed',
    tags: ['crash-repro', 'payments'],
    errorMessage: 'Analysis failed — the video may be corrupted or longer than the 20-min limit.',
  },
  decorators: Ready.decorators,
}

export const Selected: Story = {
  args: {
    ...Ready.args,
    selected: true,
    selectionVisible: true,
  },
  decorators: Ready.decorators,
}

export const ListReady: Story = {
  name: 'List / Ready',
  args: {
    ...Ready.args,
    layout: 'list',
  },
}

export const ListFailed: Story = {
  name: 'List / Failed',
  args: {
    ...Failed.args,
    layout: 'list',
  },
}

export const ListUploading: Story = {
  name: 'List / Uploading',
  args: {
    ...Uploading.args,
    layout: 'list',
  },
}
