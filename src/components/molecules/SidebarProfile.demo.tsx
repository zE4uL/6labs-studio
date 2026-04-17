import { SidebarProfile } from './SidebarProfile'

export function SidebarProfileDemo() {
  return (
    <div className="w-[280px] bg-bg-elements border border-border-subtle rounded-2xl p-s">
      <SidebarProfile name="John Wick" initials="JW" language="EN" />
    </div>
  )
}
