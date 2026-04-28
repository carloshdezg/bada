import { cn } from '@/lib/utils'

/**
 * Button — wraps the btn/btn-primary/btn-outline CSS component classes.
 *
 * Props:
 *   variant  — 'primary' | 'outline'   (default: 'primary')
 *   size     — 'sm' | 'md' | 'lg'      (default: 'md')
 *   as       — 'button' | 'a'          (default: 'button')
 *   href     — string (used when as='a')
 *   children — ReactNode
 *   className — extra classes
 *   ...rest  — passed to the underlying element
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  href,
  children,
  className,
  ...rest
}) {
  const variantClass = {
    primary: 'btn-primary',
    outline: 'btn-outline',
  }[variant]

  const sizeClass = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  }[size]

  const props = {
    className: cn('btn', variantClass, sizeClass, className),
    ...(Tag === 'a' && href ? { href } : {}),
    ...rest,
  }

  return <Tag {...props}>{children}</Tag>
}
