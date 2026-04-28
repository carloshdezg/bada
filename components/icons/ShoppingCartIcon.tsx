import LayeredIcon from './LayeredIcon'
import { COLOR_MAP, type IconProps } from './colors'

export default function ShoppingCartIcon({ primary = 'orange', size = 64, className }: IconProps) {
  const { primary: pc, accent: ac } = COLOR_MAP[primary]
  return (
    <LayeredIcon primary={primary} size={size} className={className}>
      {/* L2 shadow */}
      <path d="M10,24 L54,24 L48,42 L16,42 Z" fill={pc} opacity="0.2" transform="translate(0,2)" />
      {/* L3 handle bar */}
      <rect x="6" y="10" width="28" height="5" rx="2.5" fill={pc} />
      {/* L3 handle post */}
      <rect x="6" y="10" width="5" height="17" rx="2.5" fill={pc} />
      {/* L3 basket */}
      <path d="M10,24 L54,24 L48,42 L16,42 Z" fill={pc} />
      {/* basket bottom */}
      <rect x="14" y="40" width="36" height="5" rx="2" fill={pc} opacity="0.7" />
      {/* L3 wheels */}
      <circle cx="20" cy="52" r="6" fill={pc} />
      <circle cx="20" cy="52" r="3" fill="white" opacity="0.5" />
      <circle cx="44" cy="52" r="6" fill={pc} />
      <circle cx="44" cy="52" r="3" fill="white" opacity="0.5" />
      {/* L4 accent */}
      <circle cx="44" cy="52" r="2" fill={ac} />
    </LayeredIcon>
  )
}
