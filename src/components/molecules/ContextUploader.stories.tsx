import type { Meta, StoryObj } from '@storybook/react-vite'
import { ContextUploader } from './ContextUploader'

const meta = {
  title: 'Molecules/ContextUploader',
  component: ContextUploader,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  argTypes: {},
} satisfies Meta<typeof ContextUploader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onFilesSelected: () => {},
  },
}
