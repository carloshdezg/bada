export type Primary = 'orange' | 'blue' | 'ink'

export const COLOR_MAP: Record<Primary, { primary: string; accent: string }> = {
  orange: { primary: '#F16227', accent: '#14A3BE' },
  blue:   { primary: '#14A3BE', accent: '#F16227' },
  ink:    { primary: '#0F1923', accent: '#F16227' },
}

export interface IconProps {
  primary?:   Primary
  size?:      number
  className?: string
}
