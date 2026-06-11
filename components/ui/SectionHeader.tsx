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
      <div className="flex items-center gap-2">
        <span className="w-[3px] h-5 bg-blue rounded-full flex-shrink-0" aria-hidden="true" />
        <h2 className="text-xl font-extrabold text-text-primary">{title}</h2>
      </div>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="text-xs font-semibold text-blue bg-blue-xlight px-3 py-1 rounded-full hover:bg-blue-light transition-colors tap-highlight-none"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
