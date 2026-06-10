'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Clock, Calendar } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import BottomNav from '@/components/layout/BottomNav'
import PageHeader from '@/components/layout/PageHeader'
import StatusBadge from '@/components/ui/StatusBadge'
import { OWNER_APPOINTMENTS, STAFF_MEMBERS } from '@/lib/mock-data'
import { formatPrice } from '@/lib/format'
import { formatDateIL } from '@/lib/date-utils'
import type { Appointment } from '@/types'

type FilterType = 'all' | 'me' | 'staff' | 'service'

interface Filter {
  type: FilterType
  staffId?: string
  serviceId?: string
}

const MY_STAFF_ID = 'staff-1' // Mock: current user is מיכאל ברק

const serviceMap = new Map(OWNER_APPOINTMENTS.map((a) => [a.serviceId, a.serviceName]))
const SERVICE_OPTIONS = Array.from(serviceMap.entries())

export default function OwnerAppointmentsPage() {
  const [filter, setFilter] = useState<Filter>({ type: 'all' })

  const filtered = OWNER_APPOINTMENTS.filter((apt) => {
    if (filter.type === 'me') return apt.staffId === MY_STAFF_ID
    if (filter.type === 'staff') return apt.staffId === filter.staffId
    if (filter.type === 'service') return apt.serviceId === filter.serviceId
    return true
  })

  const activeStaff = STAFF_MEMBERS.filter((s) => s.status === 'active')

  return (
    <AppShell>
      <PageHeader title="תורים" showBack={false} />

      {/* Filter pills */}
      <div className="bg-white border-b border-surface-border px-4 py-3 sticky top-[61px] z-20">
        <div className="flex gap-2 overflow-x-auto scroll-hide">
          <FilterPill
            label="הכול"
            active={filter.type === 'all'}
            onClick={() => setFilter({ type: 'all' })}
          />
          <FilterPill
            label="רק אני"
            active={filter.type === 'me'}
            onClick={() => setFilter({ type: 'me' })}
          />
          {activeStaff.map((s) => (
            <FilterPill
              key={s.id}
              label={s.name.split(' ')[0]}
              active={filter.type === 'staff' && filter.staffId === s.id}
              onClick={() => setFilter({ type: 'staff', staffId: s.id })}
            />
          ))}
          {SERVICE_OPTIONS.map(([id, name]) => (
            <FilterPill
              key={id}
              label={name}
              active={filter.type === 'service' && filter.serviceId === id}
              onClick={() => setFilter({ type: 'service', serviceId: id })}
            />
          ))}
        </div>
      </div>

      <div className="px-4 py-4 space-y-2">
        {filtered.length === 0 ? (
          <p className="text-sm text-text-muted text-center py-12">אין תורים לפי הסינון הזה</p>
        ) : (
          filtered.map((apt) => <OwnerAppointmentRow key={apt.id} appointment={apt} />)
        )}
      </div>

      <BottomNav variant="owner" />
    </AppShell>
  )
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all tap-highlight-none',
        active
          ? 'bg-blue text-white'
          : 'bg-surface border border-surface-border text-text-secondary hover:border-blue hover:text-blue',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

function OwnerAppointmentRow({ appointment: apt }: { appointment: Appointment }) {
  return (
    <div className="bg-white rounded-xl border border-surface-border shadow-card p-3">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center text-center w-12 flex-shrink-0">
          <span className="text-xs text-text-muted">{formatDateIL(apt.date)}</span>
          <span className="text-sm font-bold text-blue mt-0.5" dir="ltr">{apt.time}</span>
        </div>
        <div className="w-px h-10 bg-surface-border flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text-primary leading-tight">{apt.serviceName}</p>
          {apt.staffName && (
            <p className="text-xs text-text-muted mt-0.5">{apt.staffName}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <StatusBadge status={apt.status} size="sm" />
          <span className="text-sm font-semibold text-text-primary" dir="ltr">
            {formatPrice(apt.priceILS)}
          </span>
        </div>
      </div>
    </div>
  )
}
