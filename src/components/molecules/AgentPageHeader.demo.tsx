import { AgentPageHeader } from './AgentPageHeader'
import { OracleIcon } from '../icons/OracleIcon'
import { RadiologistIcon } from '../icons/RadiologistIcon'

export function AgentPageHeaderDemo() {
  return (
    <div className="flex flex-col gap-xl w-full max-w-[700px]">
      <AgentPageHeader
        title="Oracle"
        description="Ask complex questions about player behavior across sessions and cohorts"
        iconGradient="radial-gradient(circle at 60% 55%, #05C290 0%, #0E99BF 50%, #1770EF 100%)"
        icon={<OracleIcon size={40} />}
      />
      <AgentPageHeader
        title="Radiologist"
        description="Examine gameplay moment-by-moment with video-backed evidence"
        iconGradient="linear-gradient(180deg, #7B4CFF 0%, #B44CFF 100%)"
        icon={<RadiologistIcon size={40} />}
      />
    </div>
  )
}
