'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { X } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import PageHeader from '@/components/layout/PageHeader'
import ServiceCard from '@/components/domain/ServiceCard'
import StepIndicator from '@/components/ui/StepIndicator'
import Button from '@/components/ui/Button'
import StarRating from '@/components/ui/StarRating'
import ContactLink from '@/components/domain/ContactLink'
import ReviewCard from '@/components/domain/ReviewCard'
import SectionHeader from '@/components/ui/SectionHeader'
import { PROVIDERS } from '@/lib/mock-data'
import { formatPrice } from '@/lib/format'
import { useBooking } from '@/context/BookingContext'
import type { ContactInfo } from '@/types'

const CONTACT_TYPES = ['phone', 'whatsapp', 'waze', 'instagram', 'facebook'] as const

function ServiceSelectionContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { draft, setProvider, setService } = useBooking()
  const [showProfile, setShowProfile] = useState(false)

  // Initialise provider from URL param if not yet in context
  const urlProviderId = searchParams.get('provider')
  const providerId = draft.providerId ?? urlProviderId

  if (!providerId) {
    router.replace('/')
    return null
  }

  if (urlProviderId && !draft.providerId) {
    setProvider(urlProviderId)
  }

  const provider = PROVIDERS.find((p) => p.id === providerId)
  if (!provider) {
    router.replace('/')
    return null
  }

  function handleSelectService(serviceId: string) {
    setService(serviceId)
    router.push('/book/datetime')
  }

  const contactEntries = CONTACT_TYPES.filter(
    (type) => provider.contact[type as keyof ContactInfo]
  )

  return (
    <AppShell showBottomNav={false}>
      <PageHeader title="בחר שירות" />
      <StepIndicator currentStep={2} />

      {/* Provider mini-banner */}
      <div className="mx-4 mb-4 bg-blue-light rounded-xl p-3 flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          <Image src={provider.avatarUrl} alt={provider.businessName} fill className="object-cover" sizes="48px" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-text-primary text-sm">{provider.businessName}</p>
          <StarRating rating={provider.rating} reviewCount={provider.reviewCount} size={11} />
        </div>
        <button
          type="button"
          onClick={() => setShowProfile(true)}
          className="text-xs font-medium text-blue hover:text-blue-dark transition-colors tap-highlight-none flex-shrink-0"
        >
          צפה בפרופיל
        </button>
      </div>

      {/* Services list */}
      <div className="px-4 pb-6 space-y-3">
        {provider.services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            selected={draft.serviceId === service.id}
            onSelect={() => handleSelectService(service.id)}
            onViewProfile={() => setShowProfile(true)}
          />
        ))}
      </div>

      {/* Provider profile bottom sheet */}
      {showProfile && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowProfile(false)}
          />
          <div className="relative bg-white rounded-t-2xl max-h-[85dvh] overflow-y-auto z-10">
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-surface-border sticky top-0 bg-white">
              <h2 className="font-semibold text-text-primary">{provider.businessName}</h2>
              <button
                type="button"
                onClick={() => setShowProfile(false)}
                aria-label="סגור"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface transition-colors tap-highlight-none"
              >
                <X size={18} className="text-text-secondary" />
              </button>
            </div>
            <div className="p-4 space-y-5">
              {/* About */}
              <div>
                <p className="text-sm font-semibold text-text-primary mb-1">אודות</p>
                <p className="text-sm text-text-secondary leading-relaxed">{provider.about}</p>
              </div>
              {/* Services */}
              <div>
                <p className="text-sm font-semibold text-text-primary mb-2">שירותים ומחירים</p>
                <div className="space-y-2">
                  {provider.services.map((s) => (
                    <div key={s.id} className="flex items-center justify-between py-1.5 border-b border-surface-border/50 last:border-0">
                      <div>
                        <p className="text-sm text-text-primary">{s.name}</p>
                        <p className="text-xs text-text-muted">{s.durationMins} דקות</p>
                      </div>
                      <span className="text-sm font-semibold text-text-primary" dir="ltr">{formatPrice(s.priceILS)}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Location */}
              <div>
                <p className="text-sm font-semibold text-text-primary mb-1">מיקום</p>
                <p className="text-sm text-text-secondary">{provider.location}</p>
              </div>
              {/* Contact */}
              {contactEntries.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-2">יצירת קשר</p>
                  <div className="grid grid-cols-4 gap-2">
                    {contactEntries.map((type) => (
                      <ContactLink
                        key={type}
                        type={type}
                        value={provider.contact[type as keyof ContactInfo] ?? ''}
                      />
                    ))}
                  </div>
                </div>
              )}
              {/* Reviews */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-text-primary">ביקורות</p>
                  <StarRating rating={provider.rating} reviewCount={provider.reviewCount} size={12} />
                </div>
                <div className="space-y-3">
                  {provider.reviews.slice(0, 3).map((r) => (
                    <ReviewCard key={r.id} review={r} />
                  ))}
                </div>
              </div>
              {/* Return CTA */}
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => setShowProfile(false)}
              >
                חזור להזמנה
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  )
}

export default function ServicePage() {
  return (
    <Suspense fallback={<div className="p-4 text-center text-text-muted">טוען...</div>}>
      <ServiceSelectionContent />
    </Suspense>
  )
}
