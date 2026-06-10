'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Calendar, Clock, TrendingUp, Users, Plus } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import BottomNav from '@/components/layout/BottomNav'
import SectionHeader from '@/components/ui/SectionHeader'
import StatusBadge from '@/components/ui/StatusBadge'
import Button from '@/components/ui/Button'
import { OWNER_APPOINTMENTS, BUSINESS_SETTINGS, STAFF_MEMBERS } from '@/lib/mock-data'
import { formatPrice } from '@/lib/format'

const TODAY = '2026-06-10'

export default function OwnerHomePage() {
  const router = useRouter()
  const todaysAppointments = OWNER_APPOINTMENTS.filter((a) => a.date === TODAY)
  const revenue = todaysAppointments
    .filter((a) => a.status !== 'cancelled')
    .reduce((sum, a) => sum + a.priceILS, 0)
  const activeStaffCount = STAFF_MEMBERS.filter((s) => s.status === 'active').length

  return (
    <AppShell>
      {/* Owner Hero Header */}
      <div className="hero-gradient sticky top-0 z-30 px-4 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-white/40">
            <Image
              src={BUSINESS_SETTINGS.imageUrl}
              alt={BUSINESS_SETTINGS.name}
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
          <div>
            <p className="text-xs text-white/70">ממשק בעל עסק</p>
            <h1 className="font-extrabold text-white">{BUSINESS_SETTINGS.name}</h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-blue-xlight to-blue-light rounded-xl p-4 text-center border border-blue/10">
            <Calendar size={18} className="text-blue mx-auto mb-1.5" />
            <p className="text-2xl font-extrabold text-blue">{todaysAppointments.length}</p>
            <p className="text-xs font-medium text-text-muted">תורים היום</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-4 text-center border border-green-100">
            <TrendingUp size={18} className="text-status-confirmed mx-auto mb-1.5" />
            <p className="text-2xl font-extrabold text-status-confirmed" dir="ltr">
              {formatPrice(revenue)}
            </p>
            <p className="text-xs font-medium text-text-muted">הכנסה</p>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-surface rounded-xl p-4 text-center border border-surface-border">
            <Users size={18} className="text-text-secondary mx-auto mb-1.5" />
            <p className="text-2xl font-extrabold text-text-primary">{activeStaffCount}</p>
            <p className="text-xs font-medium text-text-muted">צוות פעיל</p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex gap-3">
          <Button
            variant="primary"
            size="md"
            fullWidth
            startIcon={<Plus size={18} />}
            onClick={() => router.push('/book/service')}
          >
            + תור חדש
          </Button>
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={() => router.push('/owner/appointments')}
          >
            לוח שנה
          </Button>
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
                  className="bg-white rounded-xl border border-surface-border shadow-card p-3.5 flex items-center gap-3"
                >
                  <div className="flex flex-col items-center text-center w-10 flex-shrink-0 bg-blue-xlight rounded-lg py-1.5">
                    <Clock size={12} className="text-blue mb-0.5" />
                    <span className="text-xs font-bold text-blue" dir="ltr">{apt.time}</span>
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
