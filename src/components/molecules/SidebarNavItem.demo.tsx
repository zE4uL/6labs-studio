import { SidebarNavItem } from './SidebarNavItem'
import { HomeIcon } from '../icons/HomeIcon'
import { BaristaIcon } from '../icons/BaristaIcon'
import { RadiologistIcon } from '../icons/RadiologistIcon'
import { OracleIcon } from '../icons/OracleIcon'
import { ForecasterIcon } from '../icons/ForecasterIcon'

export function SidebarNavItemDemo() {
  return (
    <div className="w-[280px] bg-bg-elements border border-border-subtle rounded-2xl overflow-hidden">
      <SidebarNavItem label="Home" icon={<HomeIcon />} active />
      <SidebarNavItem label="Barista" icon={<BaristaIcon />} badge="PERSONAL AGENT" badgeVariant="muted" />
      <SidebarNavItem label="Radiologist" icon={<RadiologistIcon />} />
      <SidebarNavItem label="Oracle" icon={<OracleIcon />} />
      <SidebarNavItem label="Forecaster" icon={<ForecasterIcon />} badge="COMING SOON" badgeVariant="outlined" disabled />
    </div>
  )
}
