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
      <h2 className="text-xl font-extrabold text-text-primary">{title}</h2>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="text-xs font-semibold text-blue bg-blue-xlight px-3 py-1 rounded-full hover:bg-blue-light transition-colors tap-highlight-none"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
