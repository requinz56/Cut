'use client'

import type { Category } from '@/types'

interface CategoryCardProps {
  category: Category
  onClick?: () => void
  selected?: boolean
  compact?: boolean
}

export default function CategoryCard({ category, onClick, selected = false, compact = false }: CategoryCardProps) {
  if (compact) {
    return (
      <button
        onClick={onClick}
        className={[
          'flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-all tap-highlight-none',
          selected
            ? 'bg-blue text-white border-blue'
            : 'bg-white text-text-secondary border-surface-border hover:border-blue hover:text-blue',
        ].join(' ')}
      >
        <span>{category.icon}</span>
        <span>{category.label}</span>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className={[
        'flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all tap-highlight-none',
        selected
          ? 'bg-blue text-white border-blue shadow-card'
          : 'bg-white text-text-secondary border-surface-border hover:border-blue hover:shadow-card',
      ].join(' ')}
    >
      <span className="text-2xl">{category.icon}</span>
      <span className="text-xs font-medium">{category.label}</span>
    </button>
  )
}
