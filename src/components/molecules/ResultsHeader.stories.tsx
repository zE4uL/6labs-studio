import type { Meta, StoryObj } from '@storybook/react-vite'
import { ResultsHeader } from './ResultsHeader'

const meta = {
  title: 'Molecules/ResultsHeader',
  component: ResultsHeader,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  argTypes: {
    count: { control: { type: 'number', min: 0 } },
  },
} satisfies Meta<typeof ResultsHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    count: 24,
  },
}

export const ZeroResults: Story = {
  args: {
    count: 0,
  },
}
