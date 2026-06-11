'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Calendar, Bell } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import Button from '@/components/ui/Button'
import { useBooking } from '@/context/BookingContext'
import { formatDateLong } from '@/lib/date-utils'
import { formatPrice } from '@/lib/format'

export default function BookingSuccessPage() {
  const router = useRouter()
  const { draft, provider, service, resetBooking } = useBooking()

  // If arriving without a completed draft, redirect home
  useEffect(() => {
    if (!provider || !service) router.replace('/')
  }, [provider, service, router])

  if (!provider || !service || !draft.date || !draft.time) return null

  function goHome() {
    resetBooking()
    router.push('/')
  }

  return (
    <AppShell showBottomNav={false}>
      <div className="flex flex-col items-center px-6 pt-14 pb-8 text-center">
        {/* Success icon */}
        <div className="w-20 h-20 rounded-full bg-blue ring-8 ring-blue/15 flex items-center justify-center mb-6">
          <CheckCircle size={42} className="text-white" strokeWidth={1.75} />
        </div>

        <h1 className="text-2xl font-extrabold text-text-primary mb-2">התור אושר!</h1>
        <p className="text-sm text-text-secondary leading-relaxed mb-7 max-w-[240px]">
          התור שלך נקבע בהצלחה. נשלח לך תזכורת 24 שעות לפני.
        </p>

        {/* Summary */}
        <div className="w-full bg-white rounded-2xl border border-surface-border/70 shadow-[0_2px_16px_rgba(37,99,235,0.07)] overflow-hidden mb-7 text-start">
          <div className="px-4 py-3 border-b border-surface-border/60 flex items-center justify-between">
            <span className="text-xs text-text-secondary font-semibold">עסק</span>
            <span className="text-sm font-bold text-text-primary">{provider.businessName}</span>
          </div>
          <div className="px-4 py-3 border-b border-surface-border/60 flex items-center justify-between">
            <span className="text-xs text-text-secondary font-semibold">שירות</span>
            <span className="text-sm font-semibold text-text-primary">{service.name}</span>
          </div>
          <div className="px-4 py-3 border-b border-surface-border/60 flex items-center justify-between">
            <span className="text-xs text-text-secondary font-semibold">תאריך</span>
            <span className="text-sm font-semibold text-text-primary">{formatDateLong(draft.date!)}</span>
          </div>
          <div className="px-4 py-3 border-b border-surface-border/60 flex items-center justify-between">
            <span className="text-xs text-text-secondary font-semibold">שעה</span>
            <span className="text-sm font-semibold text-text-primary" dir="ltr">{draft.time}</span>
          </div>
          <div className="px-4 py-3.5 bg-blue flex items-center justify-between">
            <span className="text-sm font-bold text-white">סה״כ לתשלום</span>
            <span className="text-lg font-extrabold text-white" dir="ltr">{formatPrice(service.priceILS)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full space-y-3">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            startIcon={<Calendar size={18} />}
            onClick={() => { resetBooking(); router.push('/appointments') }}
          >
            התורים שלי
          </Button>
          <Button
            variant="secondary"
            size="md"
            fullWidth
            startIcon={<Bell size={16} />}
            onClick={() => { resetBooking(); router.push('/notifications') }}
          >
            קבע תזכורת
          </Button>
          <Button variant="ghost" size="md" fullWidth onClick={goHome}>
            חזרה לדף הבית
          </Button>
        </div>
      </div>
    </AppShell>
  )
}
