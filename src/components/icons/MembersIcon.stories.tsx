import type { Meta, StoryObj } from '@storybook/react-vite'
import { MembersIcon } from './MembersIcon'

const meta = {
  title: 'Icons/MembersIcon',
  component: MembersIcon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'number', min: 12, max: 64, step: 2 } },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof MembersIcon>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { size: 24 } }
export const Large: Story = { args: { size: 48 } }
