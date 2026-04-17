import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageTopbar } from './PageTopbar'

const meta = {
  title: 'Molecules/PageTopbar',
  component: PageTopbar,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  argTypes: {
    title: { control: 'text' },
  },
} satisfies Meta<typeof PageTopbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Game Intelligence',
    onBack: () => {},
  },
}
