import type { Meta, StoryObj } from '@storybook/react-vite'
import Input from './Input'
import { FilterIcon } from '../icons/FilterIcon'
import { CloseIcon } from '../icons/CloseIcon'

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: 'Enter text…', size: 'md' },
}

export const WithLabel: Story = {
  args: { label: 'Email', placeholder: 'you@example.com', size: 'md' },
}

export const WithHelper: Story = {
  args: {
    label: 'Password',
    placeholder: '••••••••',
    message: 'Must be at least 8 characters',
    type: 'password',
  },
}

export const ErrorState: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    defaultValue: 'bad-email',
    error: true,
    message: 'Please enter a valid email address',
  },
}

export const Disabled: Story = {
  args: { label: 'Name', placeholder: 'Disabled input', disabled: true },
}

export const WithIcons: Story = {
  args: {
    placeholder: 'Search…',
    leftIcon: <FilterIcon size={16} />,
    rightIcon: <CloseIcon size={14} />,
  },
}

/** All 4 sizes */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <Input key={s} size={s} placeholder={`Size ${s}`} />
      ))}
    </div>
  ),
}
