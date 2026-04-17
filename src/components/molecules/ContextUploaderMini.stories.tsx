import type { Meta, StoryObj } from '@storybook/react-vite'
import { ContextUploaderMini } from './ContextUploaderMini'

const meta = {
  title: 'Molecules/ContextUploaderMini',
  component: ContextUploaderMini,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  argTypes: {},
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContextUploaderMini>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onFilesSelected: () => {},
  },
}
