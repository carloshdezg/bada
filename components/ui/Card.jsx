import { cn } from '@/lib/utils'

/**
 * Card — wraps the card CSS component class.
 *
 * Props:
 *   hover     — boolean, adds card-hover interactive state (default: false)
 *   as        — string, HTML tag to render (default: 'div')
 *   className — extra classes
 *   children  — ReactNode
 *   ...rest   — passed to the underlying element
 */
export default function Card({
  hover = false,
  as: Tag = 'div',
  className,
  children,
  ...rest
}) {
  return (
    <Tag
      className={cn('card', hover && 'card-hover', className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
