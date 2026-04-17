import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { FilterTag } from './FilterTag'

const meta = {
  title: 'Atoms/FilterTag',
  component: FilterTag,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    selected: { control: 'boolean' },
  },
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
} satisfies Meta<typeof FilterTag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Combat',
    selected: false,
  },
}

export const Selected: Story = {
  args: {
    label: 'Combat',
    selected: true,
  },
}

export const AllStates: Story = {
  name: 'All States',
  render: () => {
    const labels = ['All', 'Combat', 'Technical', 'Monetization', 'Progression', 'Warning']
    const [selected, setSelected] = useState<Set<string>>(new Set(['All']))
    const toggle = (l: string) => {
      setSelected((prev) => {
        const next = new Set(prev)
        if (next.has(l)) next.delete(l)
        else next.add(l)
        return next
      })
    }
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 16 }}>
        {labels.map((l) => (
          <FilterTag key={l} label={l} selected={selected.has(l)} onClick={() => toggle(l)} />
        ))}
      </div>
    )
  },
}
