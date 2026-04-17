import type { Meta, StoryObj } from '@storybook/react-vite'
import { BaristaColoredIcon } from './BaristaColoredIcon'

const meta = {
  title: 'Icons/BaristaColoredIcon',
  component: BaristaColoredIcon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'number', min: 16, max: 128, step: 4 } },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof BaristaColoredIcon>
export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = { args: { size: 32 } }
export const Medium: Story = { args: { size: 48 } }
export const Large: Story = { args: { size: 64 } }
