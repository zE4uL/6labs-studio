/**
 * VideoControlsBar — Video player controls: seek bar + play/volume/timestamp/fullscreen.
 * Icons exported from Figma component sets via Desktop Bridge exportAsync.
 * Play: 462:22393, FullScreen: 462:22687, Volume: 462:22523
 *
 * @figmaComponent  Video Controls Light
 * @figmaNode       133:18559
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=133-18559
 */

import { VideoSeekBar } from './VideoSeekBar'
import type { SessionEvent } from '../../lib/types/radiologist'

interface VideoControlsBarProps {
  currentTime: number
  totalDuration: number
  isPlaying: boolean
  events: SessionEvent[]
  onPlayPause?: () => void
  onSeek?: (percent: number) => void
  onEventClick?: (event: SessionEvent) => void
  onFullscreen?: () => void
  className?: string
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

/** Figma: Video Control/Button/Play — State=Default, Type=Play (32x32, viewBox 0 0 32 32) */
function PlayIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M20.9165 15.5674C21.2498 15.7598 21.2498 16.2411 20.9165 16.4336L13.9165 20.4756C13.5832 20.6678 13.1665 20.4268 13.1665 20.042L13.1665 11.959C13.1667 11.5742 13.5832 11.334 13.9165 11.5264L20.9165 15.5674Z" fill="#9A9EAB" stroke="#9A9EAB"/>
    </svg>
  )
}

/** Figma: Video Control/Button/Play — State=Default, Type=Pause */
function PauseIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M13.8008 10C14.3529 10.0002 14.8008 10.4478 14.8008 11V21C14.8008 21.5522 14.3529 21.9998 13.8008 22H12.2002C11.648 21.9999 11.2002 21.5522 11.2002 21V11C11.2002 10.4478 11.648 10.0001 12.2002 10H13.8008ZM19.8008 10C20.3529 10.0002 20.8008 10.4478 20.8008 11V21C20.8008 21.5522 20.3529 21.9998 19.8008 22H18.2002C17.648 21.9999 17.2002 21.5522 17.2002 21V11C17.2002 10.4478 17.648 10.0001 18.2002 10H19.8008Z" fill="#9A9EAB"/>
    </svg>
  )
}

/** Figma: Video Control/Button/Volume — State=Default */
function VolumeCtrlIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M19.6665 10.666C20.6509 11.1724 21.4802 11.9353 22.067 12.8741C22.6537 13.8128 22.976 14.8926 22.9998 15.9993C22.976 17.1061 22.6537 18.1859 22.067 19.1246C21.4802 20.0634 20.6509 20.8263 19.6665 21.3327" stroke="#9A9EAB" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 19C20.2467 18.1533 21 17.22 21 16C21 14.78 20.2267 13.8467 19 13" stroke="#9A9EAB" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.3333 13.3328H10.3333C9.97971 13.3328 9.64057 13.4733 9.39052 13.7234C9.14048 13.9734 9 14.3126 9 14.6662V17.9995C9 18.7328 9.6 18.9995 10.3333 18.9995H11.3333C11.5933 18.9995 11.78 19.1862 12 19.3328L14.9267 21.6195C15.1278 21.7537 15.3615 21.8306 15.603 21.8422C15.8444 21.8537 16.0845 21.7994 16.2975 21.6851C16.5104 21.5707 16.6883 21.4006 16.812 21.1929C16.9358 20.9853 17.0008 20.7479 17 20.5062V11.6595C17 11.4119 16.931 11.1692 16.8009 10.9585C16.6707 10.7479 16.4844 10.5777 16.263 10.4669C16.0415 10.3562 15.7935 10.3093 15.5469 10.3316C15.3003 10.3538 15.0648 10.4443 14.8667 10.5928L12 12.9995C11.7667 13.1728 11.62 13.3328 11.3333 13.3328Z" stroke="#9A9EAB" strokeMiterlimit="10" strokeLinecap="round"/>
    </svg>
  )
}

/** Figma: Video Control/Button/FullScreen — State=Default, Type=FullScreen */
function FullScreenCtrlIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M13.6666 9.66797H10.9999C10.6309 9.68528 10.2837 9.84775 10.0339 10.12C9.78415 10.3922 9.65212 10.7521 9.6666 11.1213V13.668" stroke="#9A9EAB" strokeMiterlimit="10" strokeLinecap="round"/>
      <path d="M18.3335 22.334H21.0002C21.3692 22.3167 21.7164 22.1542 21.9662 21.882C22.2159 21.6097 22.348 21.2498 22.3335 20.8807V18.334" stroke="#9A9EAB" strokeMiterlimit="10" strokeLinecap="round"/>
      <path d="M9.6665 18.334V21.0007C9.68381 21.3697 9.84629 21.7169 10.1185 21.9667C10.3908 22.2164 10.7507 22.3485 11.1198 22.334H13.6665" stroke="#9A9EAB" strokeMiterlimit="10" strokeLinecap="round"/>
      <path d="M22.3335 13.6671V11.0004C22.3162 10.6314 22.1537 10.2841 21.8815 10.0344C21.6092 9.78464 21.2493 9.65261 20.8802 9.66709H18.3335" stroke="#9A9EAB" strokeMiterlimit="10" strokeLinecap="round"/>
    </svg>
  )
}

export function VideoControlsBar({
  currentTime,
  totalDuration,
  isPlaying,
  events,
  onPlayPause,
  onSeek,
  onEventClick,
  onFullscreen,
  className,
}: VideoControlsBarProps) {
  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0

  return (
    <div className={['flex flex-col gap-[5px] w-full', className].filter(Boolean).join(' ')}>
      {/* Seek bar with event dots */}
      <VideoSeekBar
        progress={progress}
        totalDuration={totalDuration}
        events={events}
        onSeek={onSeek}
        onEventClick={onEventClick}
      />

      {/* Controls row — Figma: flex, items-center, gap between left/right groups */}
      <div className="flex items-center w-full">
        {/* Left: Play + Volume — Figma: gap-[4px] */}
        <div className="flex gap-xxs items-center shrink-0">
          <button
            type="button"
            className="flex items-center justify-center cursor-pointer rounded-m video-control-btn"
            onClick={onPlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            type="button"
            className="flex items-center justify-center cursor-pointer rounded-m video-control-btn"
            aria-label="Volume"
          >
            <VolumeCtrlIcon />
          </button>
        </div>

        {/* Timestamp — Figma: 12px Poppins, base-500 (#686E81) */}
        <span
          className="whitespace-nowrap ml-xxs"
          style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: '#686E81', lineHeight: '1.5' }}
        >
          {formatTime(currentTime)} / {formatTime(totalDuration)}
        </span>

        {/* Spacer */}
        <div className="flex-1 min-w-0" />

        {/* Right: Fullscreen — Figma: gap-[4px] */}
        <div className="flex gap-xxs items-center shrink-0">
          <button
            type="button"
            className="flex items-center justify-center cursor-pointer rounded-m video-control-btn"
            onClick={onFullscreen}
            aria-label="Fullscreen"
          >
            <FullScreenCtrlIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
