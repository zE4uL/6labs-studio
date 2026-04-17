import type { Meta, StoryObj } from '@storybook/react-vite'
import { UploadTag } from './UploadTag'

const meta = {
  title: 'Atoms/UploadTag',
  component: UploadTag,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['uploading', 'uploaded'] },
  },
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
} satisfies Meta<typeof UploadTag>

export default meta
type Story = StoryObj<typeof meta>

export const Uploading: Story = {
  args: { status: 'uploading' },
}

export const Uploaded: Story = {
  args: { status: 'uploaded' },
}
