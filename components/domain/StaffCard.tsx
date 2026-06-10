'use client'

import Image from 'next/image'
import { Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import type { StaffMember } from '@/types'
import StatusBadge from '@/components/ui/StatusBadge'

interface StaffCardProps {
  staff: StaffMember
  onEdit?: () => void
  onToggle?: () => void
  onRemove?: () => void
}

export default function StaffCard({ staff, onEdit, onToggle, onRemove }: StaffCardProps) {
  const isActive = staff.status === 'active'
  const isRemoved = staff.status === 'removed'

  return (
    <div className={[
      'bg-white rounded-lg border border-surface-border shadow-card p-4',
      isRemoved ? 'opacity-60' : '',
    ].join(' ')}>
      <div className="flex items-center gap-3">
        <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-blue-light">
          {staff.avatarUrl ? (
            <Image
              src={staff.avatarUrl}
              alt={staff.name}
              fill
              className="object-cover"
              sizes="44px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-blue font-semibold text-base">
              {staff.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-semibold text-text-primary text-sm">{staff.name}</span>
            <StatusBadge status={staff.status} size="sm" />
          </div>
          <p className="text-xs text-text-secondary">{staff.role}</p>
          <p className="text-xs text-text-muted mt-0.5" dir="ltr">{staff.phone}</p>
        </div>
        {!isRemoved && (
          <div className="flex items-center gap-1 flex-shrink-0">
            {onEdit && (
              <button
                onClick={onEdit}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface transition-colors tap-highlight-none text-text-muted hover:text-blue"
                aria-label="עריכה"
              >
                <Edit2 size={15} />
              </button>
            )}
            {onToggle && !isRemoved && (
              <button
                onClick={onToggle}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface transition-colors tap-highlight-none text-text-muted hover:text-blue"
                aria-label={isActive ? 'השבת' : 'הפעל'}
              >
                {isActive ? <ToggleRight size={16} className="text-status-active" /> : <ToggleLeft size={16} />}
              </button>
            )}
            {onRemove && !staff.hasBookingHistory && (
              <button
                onClick={onRemove}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors tap-highlight-none text-text-muted hover:text-status-cancelled"
                aria-label="הסר"
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
