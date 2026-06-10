'use client'

import { Clock, ChevronLeft } from 'lucide-react'
import type { Service } from '@/types'
import { formatPrice, formatDuration } from '@/lib/format'

interface ServiceCardProps {
  service: Service
  onSelect?: () => void
  onViewProfile?: () => void
  selected?: boolean
}

export default function ServiceCard({
  service,
  onSelect,
  onViewProfile,
  selected = false,
}: ServiceCardProps) {
  return (
    <div
      className={[
        'bg-white rounded-2xl border transition-all duration-150',
        selected
          ? 'border-blue/60 ring-2 ring-blue/15 shadow-[0_2px_12px_rgba(37,99,235,0.1)]'
          : 'border-surface-border/70 shadow-[0_1px_6px_rgba(37,99,235,0.05)]',
      ].join(' ')}
    >
      <div
        onClick={onSelect}
        className="flex items-center justify-between p-4 cursor-pointer tap-highlight-none"
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-text-primary text-sm leading-tight mb-1">
            {service.name}
          </h3>
          {service.description && (
            <p className="text-xs text-text-secondary mb-2 leading-snug">
              {service.description}
            </p>
          )}
          <div className="flex items-center gap-1 text-text-muted">
            <Clock size={12} />
            <span className="text-xs font-medium">{formatDuration(service.durationMins)}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 ms-4 flex-shrink-0">
          <span className="font-bold text-text-primary text-sm" dir="ltr">
            {formatPrice(service.priceILS)}
          </span>
          {selected ? (
            <span className="w-6 h-6 bg-blue rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-bold">✓</span>
            </span>
          ) : (
            <span className="w-6 h-6 rounded-full border border-surface-border flex items-center justify-center">
              <ChevronLeft size={14} className="text-text-muted" />
            </span>
          )}
        </div>
      </div>
      {onViewProfile && (
        <div className="px-4 pb-3 border-t border-surface-border/50">
          <button
            onClick={onViewProfile}
            className="text-xs font-semibold text-blue hover:text-blue-dark transition-colors tap-highlight-none mt-2"
          >
            צפה בפרופיל
          </button>
        </div>
      )}
    </div>
  )
}
