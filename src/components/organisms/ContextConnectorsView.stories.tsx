import type { Meta, StoryObj } from '@storybook/react-vite'
import { ContextConnectorsView } from './ContextConnectorsView'

const meta = {
  title: 'Organisms/ContextConnectorsView',
  component: ContextConnectorsView,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 40 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContextConnectorsView>

export default meta
type Story = StoryObj<typeof meta>

/** All connectors displayed in the 2-row grid layout. */
export const Default: Story = {}
