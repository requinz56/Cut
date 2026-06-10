'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Calendar, Clock, MapPin } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import PageHeader from '@/components/layout/PageHeader'
import StepIndicator from '@/components/ui/StepIndicator'
import Button from '@/components/ui/Button'
import { useBooking } from '@/context/BookingContext'
import { formatDateLong } from '@/lib/date-utils'
import { formatPrice, formatDuration } from '@/lib/format'

export default function ConfirmPage() {
  const router = useRouter()
  const { draft, provider, service, confirmBooking } = useBooking()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!draft.providerId || !draft.serviceId || !draft.date || !draft.time) {
      router.replace('/')
    }
  }, [draft, router])

  if (!provider || !service || !draft.date || !draft.time) return null

  async function handleConfirm() {
    setLoading(true)
    // Simulate brief network delay for realistic UX
    await new Promise((r) => setTimeout(r, 600))
    confirmBooking()
    router.push('/booking-success')
  }

  return (
    <AppShell showBottomNav={false}>
      <PageHeader title="אישור תור" />
      <StepIndicator currentStep={4} />

      <div className="px-4 pb-6 space-y-4">
        {/* Summary card */}
        <div className="bg-white rounded-2xl border border-surface-border/70 shadow-[0_2px_16px_rgba(37,99,235,0.08)] overflow-hidden">
          {/* Provider */}
          <div className="flex items-center gap-3 p-4 border-b border-surface-border/60">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-surface-border/60">
              <Image src={provider.avatarUrl} alt={provider.businessName} fill className="object-cover" sizes="48px" />
            </div>
            <div>
              <p className="font-bold text-text-primary">{provider.businessName}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin size={11} className="text-text-muted" />
                <p className="text-xs text-text-muted">{provider.location}</p>
              </div>
            </div>
          </div>

          {/* Service */}
          <div className="px-4 py-3.5 border-b border-surface-border/60 bg-surface/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] text-text-muted font-medium mb-0.5">שירות נבחר</p>
                <p className="font-bold text-text-primary text-sm">{service.name}</p>
                <p className="text-xs text-text-secondary mt-0.5">
                  {formatDuration(service.durationMins)}
                </p>
              </div>
              <span className="text-xl font-extrabold text-blue" dir="ltr">
                {formatPrice(service.priceILS)}
              </span>
            </div>
          </div>

          {/* Date & Time */}
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-xlight flex items-center justify-center flex-shrink-0">
                <Calendar size={15} className="text-blue" />
              </span>
              <span className="text-sm font-semibold text-text-primary">
                {formatDateLong(draft.date!)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-xlight flex items-center justify-center flex-shrink-0">
                <Clock size={15} className="text-blue" />
              </span>
              <span className="text-sm font-semibold text-text-primary" dir="ltr">
                {draft.time}
              </span>
            </div>
          </div>
        </div>

        {/* Policy note */}
        <p className="text-[11px] text-text-muted text-center px-4 leading-relaxed bg-surface/60 rounded-xl py-2.5 border border-surface-border/50">
          ביטול עד 24 שעות לפני התור ללא חיוב. לאחר מכן עלולה להיגבות עמלת ביטול.
        </p>

        {/* Confirm button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          onClick={handleConfirm}
        >
          אשר תור
        </Button>

        <Button variant="ghost" size="md" fullWidth onClick={() => router.back()}>
          חזרה ועריכה
        </Button>
      </div>
    </AppShell>
  )
}
