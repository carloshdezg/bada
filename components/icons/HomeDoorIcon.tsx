import LayeredIcon from './LayeredIcon'
import { COLOR_MAP, type IconProps } from './colors'

export default function HomeDoorIcon({ primary = 'orange', size = 64, className }: IconProps) {
  const { primary: pc, accent: ac } = COLOR_MAP[primary]
  return (
    <LayeredIcon primary={primary} size={size} className={className}>
      {/* L2 shadow */}
      <polygon points="32,14 56,34 8,34" fill={pc} opacity="0.2" transform="translate(0,2)" />
      {/* L3 roof */}
      <polygon points="32,10 58,34 6,34" fill={pc} />
      {/* L3 walls */}
      <rect x="10" y="32" width="44" height="24" rx="2" fill={pc} opacity="0.88" />
      {/* door */}
      <rect x="24" y="38" width="16" height="18" rx="2" fill="white" opacity="0.5" />
      {/* left window */}
      <rect x="14" y="36" width="8" height="8" rx="1.5" fill="white" opacity="0.35" />
      {/* right window */}
      <rect x="42" y="36" width="8" height="8" rx="1.5" fill="white" opacity="0.35" />
      {/* L4 door knob */}
      <circle cx="37" cy="47" r="2.5" fill={ac} />
    </LayeredIcon>
  )
}
