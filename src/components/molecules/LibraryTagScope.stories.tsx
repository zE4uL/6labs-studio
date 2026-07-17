import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { LibraryTagScope } from './LibraryTagScope'
import { getLibraryTagOptions } from '../../lib/librarySessions'

const OPTIONS = getLibraryTagOptions().filter((o) => o.group === 'upload')

const meta = {
  title: 'Molecules/LibraryTagScope',
  component: LibraryTagScope,
  parameters: { layout: 'centered' },
  args: { options: OPTIONS, selected: [], onChange: () => {} },
} satisfies Meta<typeof LibraryTagScope>

export default meta
type Story = StoryObj<typeof meta>

function Interactive({ initial = [] as string[] }) {
  const [selected, setSelected] = useState<string[]>(initial)
  return <LibraryTagScope options={OPTIONS} selected={selected} onChange={setSelected} />
}

export const Empty: Story = {
  render: () => <Interactive />,
}

export const WithSelection: Story = {
  render: () => <Interactive initial={['tutorial', 'boss-fight']} />,
}
