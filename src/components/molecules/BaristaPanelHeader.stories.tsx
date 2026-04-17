import type { Meta, StoryObj } from '@storybook/react-vite'
import { BaristaPanelHeader } from './BaristaPanelHeader'

const meta = {
  title: 'Molecules/BaristaPanelHeader',
  component: BaristaPanelHeader,
  tags: ['autodocs'],
  argTypes: {
    subtitle: {
      control: 'select',
      options: ['Personal Assistant', 'brewing your brief...', 'managing your tasks'],
    },
    turnNumber: { control: 'number' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320, border: '1px solid #e6e7ea', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BaristaPanelHeader>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { subtitle: 'Personal Assistant', onSettings: () => {}, onClose: () => {} },
}
export const Running: Story = {
  args: {
    subtitle: 'brewing your brief...',
    turnNumber: 2,
    onSettings: () => {},
    onClose: () => {},
  },
}
export const TasksMode: Story = {
  args: { subtitle: 'managing your tasks', onSettings: () => {}, onClose: () => {} },
}
