import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toast, showToast } from './Toast'

const meta = {
  title: 'Atoms/Toast',
  component: Toast,
  parameters: { layout: 'centered' },
  args: { message: 'Copied to clipboard' },
} satisfies Meta<typeof Toast>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { message: 'Copied to clipboard' },
}

export const Trigger: Story = {
  name: 'Trigger (click to fire)',
  args: { message: 'Copied to clipboard' },
  render: () => (
    <button
      type="button"
      onClick={() => showToast('Copied to clipboard')}
      className="px-m py-s rounded-m font-body text-s font-medium"
      style={{ backgroundColor: 'var(--brand)', color: 'var(--text-on-brand)' }}
    >
      Show toast
    </button>
  ),
}
