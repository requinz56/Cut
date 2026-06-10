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
  const { draft, provider, service, confirmBooking, resetBooking } = useBooking()
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
      <PageHeader title="אישור הזמנה" />
      <StepIndicator currentStep={4} />

      <div className="px-4 pb-6 space-y-4">
        {/* Summary card */}
        <div className="bg-white rounded-xl border border-surface-border shadow-card overflow-hidden">
          {/* Provider */}
          <div className="flex items-center gap-3 p-4 border-b border-surface-border">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={provider.avatarUrl} alt={provider.businessName} fill className="object-cover" sizes="48px" />
            </div>
            <div>
              <p className="font-semibold text-text-primary">{provider.businessName}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin size={12} className="text-text-muted" />
                <p className="text-xs text-text-muted">{provider.location}</p>
              </div>
            </div>
          </div>

          {/* Service */}
          <div className="p-4 border-b border-surface-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-text-muted mb-0.5">שירות</p>
                <p className="font-medium text-text-primary">{service.name}</p>
                <p className="text-sm text-text-secondary mt-0.5">
                  {formatDuration(service.durationMins)}
                </p>
              </div>
              <span className="text-lg font-bold text-blue" dir="ltr">
                {formatPrice(service.priceILS)}
              </span>
            </div>
          </div>

          {/* Date & Time */}
          <div className="p-4 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <Calendar size={16} className="text-blue flex-shrink-0" />
              <span className="text-sm font-medium text-text-primary">
                {formatDateLong(draft.date!)}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock size={16} className="text-blue flex-shrink-0" />
              <span className="text-sm font-medium text-text-primary" dir="ltr">
                {draft.time}
              </span>
            </div>
          </div>
        </div>

        {/* Policy note */}
        <p className="text-xs text-text-muted text-center px-2 leading-relaxed">
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
          אשר הזמנה
        </Button>

        <Button variant="ghost" size="md" fullWidth onClick={() => router.back()}>
          חזור ושנה
        </Button>
      </div>
    </AppShell>
  )
}
