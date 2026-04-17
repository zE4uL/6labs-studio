import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThinkingOracle } from './ThinkingOracle'

const meta = {
  title: 'Atoms/ThinkingOracle',
  component: ThinkingOracle,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 760, padding: 20 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ThinkingOracle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
