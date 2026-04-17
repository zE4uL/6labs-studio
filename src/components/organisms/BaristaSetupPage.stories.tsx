import type { Meta, StoryObj } from '@storybook/react-vite'
import { BaristaSetupPage } from './BaristaSetupPage'

const meta = {
  title: 'Organisms/BaristaSetupPage',
  component: BaristaSetupPage,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BaristaSetupPage>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onCancel: () => {},
    onConfirm: () => {},
  },
}

export const PrefilledDesignPersona: Story = {
  args: {
    onCancel: () => {},
    onConfirm: () => {},
    initialPersona: {
      name: 'Aarav',
      department: 'Game Design',
      roles: ['Design Lead'],
      focusAreas: ['Competitor Benchmarking'],
      additionalContext: '',
    },
  },
}
