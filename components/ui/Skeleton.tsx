interface SkeletonProps {
  variant?: 'text' | 'card-list' | 'card-grid' | 'category'
  className?: string
}

function Shimmer({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-surface via-blue-xlight to-surface bg-[length:200%_100%] rounded ${className}`}
      style={{ animation: 'skeleton-shimmer 1.5s ease-in-out infinite' }}
    />
  )
}

export default function Skeleton({ variant = 'text', className = '' }: SkeletonProps) {
  if (variant === 'category') {
    return (
      <div className={`flex-shrink-0 h-9 w-24 rounded-full animate-pulse bg-blue-xlight ${className}`} />
    )
  }

  if (variant === 'card-list') {
    return (
      <div className={`bg-white rounded-xl border border-surface-border shadow-card flex gap-3 p-3.5 ${className}`}>
        <div className="w-20 h-20 rounded-lg animate-pulse bg-surface flex-shrink-0" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-3 w-16 animate-pulse bg-blue-xlight rounded" />
          <div className="h-4 w-32 animate-pulse bg-surface rounded" />
          <div className="h-3 w-24 animate-pulse bg-surface rounded" />
          <div className="h-3 w-28 animate-pulse bg-surface rounded" />
        </div>
        <div className="flex flex-col items-end justify-between flex-shrink-0 py-1">
          <div className="h-4 w-14 animate-pulse bg-surface rounded" />
          <div className="h-7 w-14 animate-pulse bg-blue-xlight rounded-full" />
        </div>
      </div>
    )
  }

  if (variant === 'card-grid') {
    return (
      <div className={`bg-white rounded-xl border border-surface-border shadow-card overflow-hidden ${className}`}>
        <div className="h-44 w-full animate-pulse bg-surface" />
        <div className="p-3 space-y-2">
          <div className="h-3 w-20 animate-pulse bg-surface rounded" />
          <div className="flex items-center justify-between">
            <div className="h-4 w-12 animate-pulse bg-surface rounded" />
            <div className="h-7 w-14 animate-pulse bg-blue-xlight rounded-full" />
          </div>
        </div>
      </div>
    )
  }

  // default: text
  return <div className={`h-4 animate-pulse bg-surface rounded ${className}`} />
}
