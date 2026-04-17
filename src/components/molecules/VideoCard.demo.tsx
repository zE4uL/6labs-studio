import { VideoCard } from './VideoCard'

export function VideoCardDemo() {
  return (
    <div className="grid grid-cols-3 gap-[12px] w-full">
      <VideoCard sessionId="Session #2847" date="10/11/25" duration="4:05" description="Competitive ranked match with strategic gameplay." tags={['items looted', 'game crashed', '+1']} />
      <VideoCard sessionId="Session #2846" date="10/11/25" duration="3:22" description="Solo ranked match. High kill count." tags={['booyah', 'top 3']} />
      <VideoCard sessionId="Session #2845" date="10/10/25" duration="5:47" description="Squad match with team coordination." tags={['squad win', 'zone damage']} />
    </div>
  )
}
