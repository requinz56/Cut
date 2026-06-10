'use client'

import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PageHeaderProps {
  title: string
  showBack?: boolean
  onBack?: () => void
  action?: { label: string; onClick: () => void }
  transparent?: boolean
  className?: string
}

export default function PageHeader({
  title,
  showBack = true,
  onBack,
  action,
  transparent = false,
  className = '',
}: PageHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  return (
    <header
      className={[
        'flex items-center justify-between px-4 py-4 sticky top-0 z-30',
        transparent ? 'bg-transparent' : 'bg-white/95 border-b border-surface-border backdrop-blur-sm',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {showBack && (
          <button
            onClick={handleBack}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-surface border border-surface-border shadow-sm hover:bg-blue-light hover:border-blue/30 transition-all tap-highlight-none"
            aria-label="חזרה"
          >
            <ChevronRight size={22} className="text-blue" />
          </button>
        )}
        <h1 className="text-lg font-extrabold text-text-primary truncate">{title}</h1>
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="flex-shrink-0 text-sm font-medium text-blue hover:text-blue-dark transition-colors tap-highlight-none ms-3"
        >
          {action.label}
        </button>
      )}
    </header>
  )
}
