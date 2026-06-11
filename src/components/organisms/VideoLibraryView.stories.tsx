import type { Meta, StoryObj } from '@storybook/react-vite'
import { VideoLibraryView, type LibraryVideo } from './VideoLibraryView'

const meta = {
  title: 'Organisms/VideoLibraryView',
  component: VideoLibraryView,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof VideoLibraryView>

export default meta
type Story = StoryObj<typeof meta>

const NOW = Date.now()

const fixture = (overrides: Partial<LibraryVideo> & { id: string; title: string }): LibraryVideo => ({
  sizeBytes: 120 * 1024 * 1024,
  status: 'ready',
  progress: 100,
  tags: [],
  addedAt: NOW - 1000 * 60 * 60 * 5,
  ...overrides,
})

/** Default demo seed — two Ready, one Analyzing, one Failed */
export const Default: Story = {
  args: {},
}

export const Empty: Story = {
  args: {
    initialVideos: [],
  },
}

export const MixedLifecycle: Story = {
  args: {
    initialVideos: [
      fixture({
        id: 'v1',
        title: 'Bermuda BR — onboarding flow walkthrough.mp4',
        durationLabel: '4:12',
        tags: ['tutorial', 'onboarding'],
        description: 'First-session new player path, captured on mid-tier device.',
      }),
      fixture({
        id: 'v2',
        title: 'Ranked match — squad wipe at zone 4.mp4',
        status: 'uploading',
        progress: 36,
      }),
      fixture({
        id: 'v3',
        title: 'Lobby matchmaking repro — long queue.webm',
        status: 'processing',
        tags: ['matchmaking'],
        // far-future end so the story stays in the Analyzing state
        analysisEndsAt: NOW + 1000 * 60 * 60,
      }),
      fixture({
        id: 'v4',
        title: 'Crash repro — checkout screen.mp4',
        status: 'failed',
        tags: ['crash-repro', 'payments'],
        error: 'Analysis failed — the video may be corrupted or longer than the 20-min limit.',
      }),
    ],
  },
}

export const AllReady: Story = {
  args: {
    initialVideos: [
      fixture({ id: 'r1', title: 'Boss fight — Tier 3 difficulty spike.mov', durationLabel: '12:03', tags: ['boss-fight', 'balance'] }),
      fixture({ id: 'r2', title: 'Speedrun — chapter 2 skip route.mp4', durationLabel: '7:48', tags: ['speedrun'] }),
      fixture({ id: 'r3', title: 'New player FTUE — full session.webm', durationLabel: '18:22', tags: ['tutorial'] }),
    ],
  },
}
