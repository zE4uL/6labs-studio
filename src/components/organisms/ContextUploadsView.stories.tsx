import type { Meta, StoryObj } from '@storybook/react-vite'
import { ContextUploadsView } from './ContextUploadsView'

const meta = {
  title: 'Organisms/ContextUploadsView',
  component: ContextUploadsView,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 40 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContextUploadsView>

export default meta
type Story = StoryObj<typeof meta>

/** Empty state — no files uploaded yet, shows the full uploader. */
export const Empty: Story = {}

/**
 * With files state — the component manages internal state,
 * so this starts empty but demonstrates the upload flow when files are dropped.
 */
export const WithFiles: Story = {}
