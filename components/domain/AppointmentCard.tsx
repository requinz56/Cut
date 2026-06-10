'use client'

import Image from 'next/image'
import { Clock, Calendar } from 'lucide-react'
import type { Appointment } from '@/types'
import StatusBadge from '@/components/ui/StatusBadge'
import { formatDateIL } from '@/lib/date-utils'
import { formatPrice, formatDuration } from '@/lib/format'

interface AppointmentCardProps {
  appointment: Appointment
  onCancel?: () => void
  onClick?: () => void
}

export default function AppointmentCard({ appointment, onCancel, onClick }: AppointmentCardProps) {
  const isUpcoming =
    appointment.status === 'confirmed' || appointment.status === 'pending'

  return (
    <div
      onClick={onClick}
      className={[
        'bg-white rounded-lg border border-surface-border shadow-card p-4',
        onClick ? 'cursor-pointer active:scale-[0.99] transition-transform tap-highlight-none' : '',
      ].join(' ')}
    >
      <div className="flex items-start gap-3">
        <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={appointment.providerAvatar}
            alt={appointment.providerName}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-text-primary text-sm leading-tight">
              {appointment.providerName}
            </h3>
            <StatusBadge status={appointment.status} />
          </div>
          <p className="text-sm text-text-secondary mb-2">{appointment.serviceName}</p>
          <div className="flex items-center gap-3 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              <span dir="ltr">{formatDateIL(appointment.date)}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              <span dir="ltr">{appointment.time}</span>
            </span>
            <span dir="ltr">{formatPrice(appointment.priceILS)}</span>
          </div>
          {appointment.staffName && (
            <p className="text-xs text-text-muted mt-1">עם {appointment.staffName}</p>
          )}
        </div>
      </div>
      {isUpcoming && onCancel && (
        <div className="mt-3 pt-3 border-t border-surface-border/50">
          <button
            onClick={(e) => { e.stopPropagation(); onCancel(); }}
            className="text-sm font-medium text-status-cancelled hover:text-red-700 transition-colors tap-highlight-none"
          >
            ביטול תור
          </button>
        </div>
      )}
    </div>
  )
}
