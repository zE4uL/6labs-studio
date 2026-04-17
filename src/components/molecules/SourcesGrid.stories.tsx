import type { Meta, StoryObj } from '@storybook/react-vite'
import { SourcesGrid } from './SourcesGrid'

const meta = {
  title: 'Molecules/SourcesGrid',
  component: SourcesGrid,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 720, padding: 20 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SourcesGrid>

export default meta
type Story = StoryObj<typeof meta>

const mockSources = [
  { id: 's1', duration: '4:05', title: 'Tutorial Session 1' },
  { id: 's2', duration: '3:22', title: 'Tutorial Session 2' },
  { id: 's3', duration: '5:10', title: 'Tutorial Session 3' },
]

export const Default: Story = {
  args: {
    sources: mockSources,
    onExpandSources: () => console.log('expand sources'),
  },
}

export const SingleSource: Story = {
  args: {
    sources: [mockSources[0]],
    onExpandSources: () => {},
  },
}

export const ManySources: Story = {
  args: {
    sources: Array.from({ length: 200 }, (_, i) => ({
      id: `s${i}`,
      duration: '4:05',
      title: `Session ${i + 1}`,
    })),
    onExpandSources: () => {},
  },
}
