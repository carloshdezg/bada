import LayeredIcon from './LayeredIcon'
import { COLOR_MAP, type IconProps } from './colors'

const BUBBLE = 'M12,12 Q12,6 18,6 H46 Q52,6 52,12 V32 Q52,38 46,38 H34 L24,52 L24,38 H18 Q12,38 12,32 V12 Z'

export default function ChatIcon({ primary = 'orange', size = 64, className }: IconProps) {
  const { primary: pc, accent: ac } = COLOR_MAP[primary]
  return (
    <LayeredIcon primary={primary} size={size} className={className}>
      {/* L2 shadow */}
      <path d={BUBBLE} fill={pc} opacity="0.2" transform="translate(1,2)" />
      {/* L3 bubble */}
      <path d={BUBBLE} fill={pc} />
      {/* dots */}
      <circle cx="22" cy="22" r="4" fill="white" opacity="0.4" />
      <circle cx="32" cy="22" r="4" fill="white" opacity="0.4" />
      <circle cx="42" cy="22" r="4" fill="white" opacity="0.4" />
      {/* L4 accent dot */}
      <circle cx="42" cy="22" r="4" fill={ac} opacity="0.9" />
    </LayeredIcon>
  )
}
