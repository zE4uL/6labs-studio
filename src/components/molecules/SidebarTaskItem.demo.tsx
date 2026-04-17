import { SidebarTaskItem } from './SidebarTaskItem'

export function SidebarTaskItemDemo() {
  return (
    <div className="w-[280px] bg-bg-elements border border-border-subtle rounded-2xl overflow-hidden">
      <SidebarTaskItem query="Show me players who got booyah" />
      <SidebarTaskItem query="Where are players getting stuck?" state="loading" />
      <SidebarTaskItem query="Best squad win rate" state="complete" />
      <SidebarTaskItem query="Most matches played" active />
    </div>
  )
}
