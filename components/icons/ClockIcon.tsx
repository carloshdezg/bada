import LayeredIcon from './LayeredIcon'
import { COLOR_MAP, type IconProps } from './colors'

export default function ClockIcon({ primary = 'orange', size = 64, className }: IconProps) {
  const { primary: pc, accent: ac } = COLOR_MAP[primary]
  return (
    <LayeredIcon primary={primary} size={size} className={className}>
      {/* L2 shadow */}
      <circle cx="32" cy="34" r="22" fill={pc} opacity="0.2" />
      {/* L3 clock face */}
      <circle cx="32" cy="32" r="22" fill={pc} />
      {/* inner ring */}
      <circle cx="32" cy="32" r="16" fill="white" opacity="0.1" />
      {/* hour hand (pointing ~10) */}
      <line x1="32" y1="32" x2="22" y2="22" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      {/* minute hand (pointing ~12) */}
      <line x1="32" y1="32" x2="32" y2="16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      {/* center dot */}
      <circle cx="32" cy="32" r="3" fill="white" />
      {/* L4 accent tick at 12 */}
      <rect x="30" y="12" width="4" height="6" rx="2" fill={ac} />
    </LayeredIcon>
  )
}
