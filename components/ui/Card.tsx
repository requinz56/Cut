interface CardProps {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: boolean
  border?: boolean
  onClick?: () => void
  className?: string
  children: React.ReactNode
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
}

export default function Card({
  padding = 'md',
  shadow = true,
  border = true,
  onClick,
  className = '',
  children,
}: CardProps) {
  const isClickable = !!onClick

  return (
    <div
      onClick={onClick}
      className={[
        'bg-surface-card rounded-lg overflow-hidden',
        shadow ? 'shadow-card' : '',
        border ? 'border border-surface-border' : '',
        paddingClasses[padding],
        isClickable ? 'cursor-pointer active:scale-[0.99] transition-transform duration-100 tap-highlight-none' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
