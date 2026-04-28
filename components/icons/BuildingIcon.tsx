import LayeredIcon from './LayeredIcon'
import { COLOR_MAP, type IconProps } from './colors'

export default function BuildingIcon({ primary = 'orange', size = 64, className }: IconProps) {
  const { primary: pc, accent: ac } = COLOR_MAP[primary]
  return (
    <LayeredIcon primary={primary} size={size} className={className}>
      {/* L2 shadow */}
      <rect x="14" y="18" width="36" height="38" rx="2" fill={pc} opacity="0.18" transform="translate(1,2)" />
      {/* L3 main building */}
      <rect x="12" y="16" width="40" height="38" rx="2" fill={pc} />
      {/* roof cap */}
      <rect x="10" y="12" width="44" height="7" rx="2" fill={pc} opacity="0.82" />
      {/* windows row 1 */}
      <rect x="17" y="22" width="8" height="6" rx="1" fill="white" opacity="0.28" />
      <rect x="28" y="22" width="8" height="6" rx="1" fill="white" opacity="0.28" />
      <rect x="39" y="22" width="8" height="6" rx="1" fill="white" opacity="0.28" />
      {/* windows row 2 */}
      <rect x="17" y="32" width="8" height="6" rx="1" fill="white" opacity="0.28" />
      <rect x="28" y="32" width="8" height="6" rx="1" fill="white" opacity="0.28" />
      <rect x="39" y="32" width="8" height="6" rx="1" fill="white" opacity="0.28" />
      {/* door */}
      <rect x="27" y="42" width="10" height="12" rx="2" fill="white" opacity="0.5" />
      {/* L4 lit window (accent) */}
      <rect x="39" y="22" width="8" height="6" rx="1" fill={ac} opacity="0.85" />
    </LayeredIcon>
  )
}
