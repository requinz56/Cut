'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Calendar, Clock, TrendingUp, Users } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import BottomNav from '@/components/layout/BottomNav'
import SectionHeader from '@/components/ui/SectionHeader'
import StatusBadge from '@/components/ui/StatusBadge'
import { OWNER_APPOINTMENTS, BUSINESS_SETTINGS } from '@/lib/mock-data'
import { formatPrice } from '@/lib/format'

const TODAY = '2026-06-10'

export default function OwnerHomePage() {
  const router = useRouter()
  const todaysAppointments = OWNER_APPOINTMENTS.filter((a) => a.date === TODAY)
  const revenue = todaysAppointments
    .filter((a) => a.status !== 'cancelled')
    .reduce((sum, a) => sum + a.priceILS, 0)

  return (
    <AppShell>
      {/* Header */}
      <div className="bg-white border-b border-surface-border px-4 pt-5 pb-4 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={BUSINESS_SETTINGS.imageUrl}
              alt={BUSINESS_SETTINGS.name}
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
          <div>
            <p className="text-xs text-text-muted">ממשק בעל עסק</p>
            <h1 className="font-bold text-text-primary">{BUSINESS_SETTINGS.name}</h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-blue-light rounded-xl p-3 text-center">
            <Calendar size={18} className="text-blue mx-auto mb-1" />
            <p className="text-xl font-bold text-blue">{todaysAppointments.length}</p>
            <p className="text-xs text-text-muted">תורים היום</p>
          </div>
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <TrendingUp size={18} className="text-status-confirmed mx-auto mb-1" />
            <p className="text-xl font-bold text-status-confirmed" dir="ltr">
              {formatPrice(revenue)}
            </p>
            <p className="text-xs text-text-muted">הכנסה</p>
          </div>
          <div className="bg-surface rounded-xl p-3 text-center">
            <Users size={18} className="text-text-secondary mx-auto mb-1" />
            <p className="text-xl font-bold text-text-primary">3</p>
            <p className="text-xs text-text-muted">צוות פעיל</p>
          </div>
        </div>

        {/* Today's appointments */}
        <div>
          <SectionHeader
            title="לוח היום"
            actionLabel="כל התורים"
            onAction={() => router.push('/owner/appointments')}
            className="mb-3"
          />
          {todaysAppointments.length === 0 ? (
            <p className="text-sm text-text-muted text-center py-8">אין תורים להיום</p>
          ) : (
            <div className="space-y-2">
              {todaysAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-white rounded-xl border border-surface-border shadow-card p-3 flex items-center gap-3"
                >
                  <div className="flex flex-col items-center text-center w-10 flex-shrink-0">
                    <Clock size={13} className="text-blue mb-0.5" />
                    <span className="text-xs font-semibold text-blue" dir="ltr">{apt.time}</span>
                  </div>
                  <div className="w-px h-8 bg-surface-border flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary leading-tight">{apt.serviceName}</p>
                    {apt.staffName && (
                      <p className="text-xs text-text-muted">{apt.staffName}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm font-semibold text-text-primary" dir="ltr">
                      {formatPrice(apt.priceILS)}
                    </span>
                    <StatusBadge status={apt.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav variant="owner" />
    </AppShell>
  )
}
