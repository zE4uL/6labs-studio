/**
 * BaristaColoredIcon — the colored "mug with whipped cream" Barista mark.
 * Exported from Apparatus Figma node 5978:63073 (Barista — Variant2) as a
 * raster-embedded SVG. Served from /public/assets/barista-colored.svg so the
 * 507KB base64-encoded bitmap is not bundled into the JS.
 *
 * @figmaComponent  Barista
 * @figmaNode       5978:63073
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 */

interface BaristaColoredIconProps {
  size?: number
  className?: string
  'aria-label'?: string
}

export function BaristaColoredIcon({
  size = 32,
  className,
  'aria-label': ariaLabel = 'Barista',
}: BaristaColoredIconProps) {
  return (
    <img
      src="/studio/assets/barista-colored.svg"
      width={size}
      height={size}
      alt={ariaLabel}
      className={className}
      style={{ display: 'block' }}
    />
  )
}
