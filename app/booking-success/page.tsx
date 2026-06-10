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
      <div className="flex flex-col items-center px-6 pt-16 pb-8 text-center">
        {/* Success icon */}
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-5">
          <CheckCircle size={40} className="text-status-confirmed" />
        </div>

        <h1 className="text-2xl font-bold text-text-primary mb-2">ההזמנה אושרה!</h1>
        <p className="text-text-secondary leading-relaxed mb-8">
          התור שלך אושר בהצלחה. נשלח לך תזכורת יום לפני התור.
        </p>

        {/* Summary */}
        <div className="w-full bg-surface rounded-xl border border-surface-border p-4 mb-8 space-y-3 text-start">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-muted">עסק</span>
            <span className="text-sm font-medium text-text-primary">{provider.businessName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-muted">שירות</span>
            <span className="text-sm font-medium text-text-primary">{service.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-muted">תאריך</span>
            <span className="text-sm font-medium text-text-primary">{formatDateLong(draft.date!)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-muted">שעה</span>
            <span className="text-sm font-medium text-text-primary" dir="ltr">{draft.time}</span>
          </div>
          <div className="flex items-center justify-between border-t border-surface-border pt-3">
            <span className="text-sm font-semibold text-text-primary">סה״כ לתשלום</span>
            <span className="text-base font-bold text-blue" dir="ltr">{formatPrice(service.priceILS)}</span>
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
            הגדרת תזכורת
          </Button>
          <Button variant="ghost" size="md" fullWidth onClick={goHome}>
            חזרה לדף הבית
          </Button>
        </div>
      </div>
    </AppShell>
  )
}
