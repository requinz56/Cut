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
        'bg-white rounded-lg border transition-all duration-150',
        selected
          ? 'border-blue ring-2 ring-blue/20 shadow-card'
          : 'border-surface-border shadow-card',
      ].join(' ')}
    >
      <div
        onClick={onSelect}
        className="flex items-center justify-between p-4 cursor-pointer tap-highlight-none"
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary text-base leading-tight mb-1">
            {service.name}
          </h3>
          {service.description && (
            <p className="text-sm text-text-secondary mb-1.5 leading-snug">
              {service.description}
            </p>
          )}
          <div className="flex items-center gap-1 text-text-muted">
            <Clock size={13} />
            <span className="text-xs">{formatDuration(service.durationMins)}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 ms-4 flex-shrink-0">
          <span className="font-semibold text-text-primary" dir="ltr">
            {formatPrice(service.priceILS)}
          </span>
          {selected ? (
            <span className="w-5 h-5 bg-blue rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </span>
          ) : (
            <ChevronLeft size={18} className="text-text-muted" />
          )}
        </div>
      </div>
      {onViewProfile && (
        <div className="px-4 pb-3 border-t border-surface-border/50">
          <button
            onClick={onViewProfile}
            className="text-sm font-medium text-blue hover:text-blue-dark transition-colors tap-highlight-none mt-2"
          >
            צפה בפרופיל
          </button>
        </div>
      )}
    </div>
  )
}
