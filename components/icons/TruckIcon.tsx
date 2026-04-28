import LayeredIcon from './LayeredIcon'
import { COLOR_MAP, type IconProps } from './colors'

export default function TruckIcon({ primary = 'orange', size = 64, className }: IconProps) {
  const { primary: pc, accent: ac } = COLOR_MAP[primary]
  return (
    <LayeredIcon primary={primary} size={size} className={className}>
      {/* L2 shadow */}
      <rect x="8" y="22" width="32" height="22" rx="3" fill={pc} opacity="0.18" />
      {/* L3 box body */}
      <rect x="6" y="18" width="32" height="24" rx="3" fill={pc} />
      {/* L3 cab */}
      <rect x="38" y="24" width="18" height="18" rx="3" fill={pc} />
      {/* cab roof slant */}
      <polygon points="36,22 56,22 56,27 38,27" fill={pc} opacity="0.85" />
      {/* cab window */}
      <rect x="40" y="26" width="13" height="9" rx="2" fill="white" opacity="0.65" />
      {/* undercarriage */}
      <rect x="6" y="40" width="50" height="4" rx="2" fill={pc} opacity="0.65" />
      {/* L3 wheels */}
      <circle cx="16" cy="48" r="7" fill={pc} />
      <circle cx="16" cy="48" r="3.5" fill="white" opacity="0.45" />
      <circle cx="46" cy="48" r="7" fill={pc} />
      <circle cx="46" cy="48" r="3.5" fill="white" opacity="0.45" />
      {/* L4 accent wheel hub */}
      <circle cx="46" cy="48" r="2" fill={ac} />
    </LayeredIcon>
  )
}
