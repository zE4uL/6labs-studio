import { ConnectorCard } from './ConnectorCard'
import { AppsFlyerIcon } from '../icons/connectors/AppsFlyerIcon'
import { JiraIcon } from '../icons/connectors/JiraIcon'
import { SlackIcon } from '../icons/connectors/SlackIcon'
import { DiscordIcon } from '../icons/connectors/DiscordIcon'

export function ConnectorCardDemo() {
  return (
    <div className="grid grid-cols-2 gap-m w-full max-w-[600px]">
      <ConnectorCard icon={<AppsFlyerIcon />} name="AppsFlyer" description="Connect attribution data and campaign performance." />
      <ConnectorCard icon={<JiraIcon />} name="Jira" description="Sync issues and track project progress." />
      <ConnectorCard icon={<SlackIcon />} name="Slack" description="Push notifications and alerts to channels." connected />
      <ConnectorCard icon={<DiscordIcon />} name="Discord" description="Community engagement and event alerts." />
    </div>
  )
}
