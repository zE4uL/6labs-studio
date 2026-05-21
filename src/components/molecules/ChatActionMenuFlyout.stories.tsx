import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChatActionMenuFlyout, type ConnectorOption } from './ChatActionMenuFlyout'
import { BigQueryIcon } from '../icons/connectors/BigQueryIcon'

const BASE_CONNECTORS: ConnectorOption[] = [
  {
    id: 'bigquery',
    label: 'BigQuery',
    secondary: 'sixlabs-qa',
    icon: <BigQueryIcon size={18} />,
    enabled: false,
  },
]

function Demo({
  defaultOpen,
  initialConnectors = BASE_CONNECTORS,
}: {
  defaultOpen?: 'root' | 'connectors'
  initialConnectors?: ConnectorOption[]
}) {
  const [connectors, setConnectors] = useState<ConnectorOption[]>(initialConnectors)

  const handleConnectorsChange = (enabledIds: string[]) => {
    setConnectors((prev) =>
      prev.map((c) => ({ ...c, enabled: enabledIds.includes(c.id) })),
    )
  }

  return (
    <div style={{ padding: 80, display: 'flex', justifyContent: 'flex-start' }}>
      <ChatActionMenuFlyout
        connectors={connectors}
        onConnectorsChange={handleConnectorsChange}
        onAttachFile={(f) => console.log('attach', f.name)}
        defaultOpen={defaultOpen}
      />
    </div>
  )
}

const noop = () => {}
const STORY_ARGS = {
  connectors: BASE_CONNECTORS,
  onConnectorsChange: noop,
}

const meta = {
  title: 'Molecules/ChatActionMenuFlyout',
  component: ChatActionMenuFlyout,
  parameters: { layout: 'fullscreen' },
  args: STORY_ARGS,
} satisfies Meta<typeof ChatActionMenuFlyout>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: STORY_ARGS,
  render: () => <Demo defaultOpen="root" />,
}

export const ConnectorsSubmenu: Story = {
  name: 'Connectors submenu (none enabled)',
  args: STORY_ARGS,
  render: () => <Demo defaultOpen="connectors" />,
}

export const BigQueryEnabled: Story = {
  name: 'Connectors submenu (BigQuery enabled)',
  args: STORY_ARGS,
  render: () => (
    <Demo
      defaultOpen="connectors"
      initialConnectors={BASE_CONNECTORS.map((c) => ({ ...c, enabled: true }))}
    />
  ),
}

export const NoConnectors: Story = {
  name: 'Connectors submenu (empty state)',
  args: STORY_ARGS,
  render: () => <Demo defaultOpen="connectors" initialConnectors={[]} />,
}
