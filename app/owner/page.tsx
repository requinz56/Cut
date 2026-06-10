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
            <p className="text-xs text-white/70">ניהול עסק</p>
            <h1 className="font-extrabold text-white">{BUSINESS_SETTINGS.name}</h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-white rounded-2xl p-3.5 text-center border border-blue/15 shadow-[0_2px_10px_rgba(37,99,235,0.08)]">
            <div className="w-8 h-8 rounded-xl bg-blue-xlight flex items-center justify-center mx-auto mb-2">
              <Calendar size={16} className="text-blue" />
            </div>
            <p className="text-2xl font-extrabold text-blue leading-none mb-1">{todaysAppointments.length}</p>
            <p className="text-[10px] font-semibold text-text-muted leading-tight">תורים היום</p>
          </div>
          <div className="bg-white rounded-2xl p-3.5 text-center border border-green-100 shadow-[0_2px_10px_rgba(34,197,94,0.08)]">
            <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center mx-auto mb-2">
              <TrendingUp size={16} className="text-status-confirmed" />
            </div>
            <p className="text-lg font-extrabold text-status-confirmed leading-none mb-1" dir="ltr">
              {formatPrice(revenue)}
            </p>
            <p className="text-[10px] font-semibold text-text-muted leading-tight">הכנסה</p>
          </div>
          <div className="bg-white rounded-2xl p-3.5 text-center border border-surface-border shadow-[0_2px_10px_rgba(37,99,235,0.04)]">
            <div className="w-8 h-8 rounded-xl bg-surface flex items-center justify-center mx-auto mb-2">
              <Users size={16} className="text-text-secondary" />
            </div>
            <p className="text-2xl font-extrabold text-text-primary leading-none mb-1">{activeStaffCount}</p>
            <p className="text-[10px] font-semibold text-text-muted leading-tight">צוות פעיל</p>
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
            + הזמן תור
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
            title="תורים להיום"
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
                  className="bg-white rounded-2xl border border-surface-border/70 shadow-[0_1px_6px_rgba(37,99,235,0.05)] p-3.5 flex items-center gap-3"
                >
                  <div className="flex flex-col items-center justify-center w-11 h-11 flex-shrink-0 bg-blue-xlight rounded-xl">
                    <Clock size={11} className="text-blue mb-0.5" />
                    <span className="text-[11px] font-extrabold text-blue leading-none" dir="ltr">{apt.time}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-text-primary leading-tight">{apt.serviceName}</p>
                    {apt.staffName && (
                      <p className="text-xs text-text-muted mt-0.5">{apt.staffName}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-sm font-bold text-text-primary" dir="ltr">
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
