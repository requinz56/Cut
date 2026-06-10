interface SectionHeaderProps {
  title: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export default function SectionHeader({
  title,
  actionLabel,
  onAction,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="text-sm font-medium text-blue hover:text-blue-dark transition-colors tap-highlight-none"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
