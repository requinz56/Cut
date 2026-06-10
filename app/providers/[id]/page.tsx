'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter, useParams } from 'next/navigation'
import { MapPin, ChevronRight, X } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import BottomNav from '@/components/layout/BottomNav'
import StarRating from '@/components/ui/StarRating'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import ContactLink from '@/components/domain/ContactLink'
import ReviewCard from '@/components/domain/ReviewCard'
import ServiceCard from '@/components/domain/ServiceCard'
import { PROVIDERS, CATEGORIES } from '@/lib/mock-data'
import { formatPrice } from '@/lib/format'
import type { ContactInfo } from '@/types'
import { useBooking } from '@/context/BookingContext'

const CONTACT_TYPES = ['phone', 'whatsapp', 'waze', 'instagram', 'facebook'] as const

function ProviderProfileContent() {
  const params = useParams()
  const router = useRouter()
  const { setProvider } = useBooking()
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null)

  const foundProvider = PROVIDERS.find((p) => p.id === params.id)
  if (!foundProvider) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-64">
          <p className="text-text-muted">עסק לא נמצא</p>
        </div>
        <BottomNav />
      </AppShell>
    )
  }
  const provider = foundProvider

  const category = CATEGORIES.find((c) => c.id === provider.category)
  const visibleReviews = showAllReviews ? provider.reviews : provider.reviews.slice(0, 3)
  const contactEntries = CONTACT_TYPES.filter(
    (type) => provider.contact[type as keyof ContactInfo]
  )

  function handleBook() {
    setProvider(provider.id)
    router.push(`/book/service?provider=${provider.id}`)
  }

  return (
    <AppShell showBottomNav={false} className="!pb-32">
      {/* Cover image with back button */}
      <div className="relative h-56 w-full">
        <Image
          src={provider.coverUrl}
          alt={provider.businessName}
          fill
          className="object-cover"
          priority
          sizes="430px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="חזרה"
          className="absolute top-4 end-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center tap-highlight-none shadow-md"
        >
          <ChevronRight size={20} className="text-text-primary" />
        </button>
      </div>

      {/* Business header */}
      <div className="px-4 py-4 bg-white border-b border-surface-border">
        <div className="flex items-start gap-3">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-card -mt-10 border-2 border-white">
            <Image
              src={provider.avatarUrl}
              alt={provider.businessName}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div className="flex-1 pt-1">
            <p className="text-xs text-blue font-medium mb-0.5">{category?.label}</p>
            <h1 className="text-lg font-bold text-text-primary leading-tight">{provider.businessName}</h1>
            <div className="mt-1">
              <StarRating rating={provider.rating} reviewCount={provider.reviewCount} size={13} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-3">
          <MapPin size={14} className="text-text-muted flex-shrink-0" />
          <p className="text-sm text-text-secondary">{provider.location}</p>
        </div>
      </div>

      <div className="space-y-0">
        {/* About */}
        <section className="px-4 py-5 border-b border-surface-border">
          <SectionHeader title="אודות" className="mb-2" />
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
            {provider.about}
          </p>
        </section>

        {/* Gallery */}
        {provider.gallery.length > 0 && (
          <section className="px-4 py-5 border-b border-surface-border">
            <SectionHeader title="גלריה" className="mb-3" />
            <div className="flex gap-2 overflow-x-auto scroll-hide -mx-4 px-4">
              {provider.gallery.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setGalleryIndex(i)}
                  aria-label={`תמונה ${i + 1}`}
                  className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 tap-highlight-none"
                >
                  <Image
                    src={url}
                    alt={`תמונה ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Services */}
        <section className="px-4 py-5 border-b border-surface-border">
          <SectionHeader title="שירותים ומחירים" className="mb-3" />
          <div className="space-y-2">
            {provider.services.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between py-2 border-b border-surface-border/50 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-text-primary">{service.name}</p>
                  <p className="text-xs text-text-muted">{service.durationMins} דקות</p>
                </div>
                <span className="text-sm font-semibold text-text-primary" dir="ltr">
                  {formatPrice(service.priceILS)}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        {contactEntries.length > 0 && (
          <section className="px-4 py-5 border-b border-surface-border">
            <SectionHeader title="יצירת קשר" className="mb-3" />
            <div className="grid grid-cols-4 gap-2">
              {contactEntries.map((type) => (
                <ContactLink
                  key={type}
                  type={type}
                  value={provider.contact[type as keyof ContactInfo] ?? ''}
                />
              ))}
            </div>
          </section>
        )}

        {/* Reviews */}
        <section className="px-4 py-5 border-b border-surface-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-text-primary">ביקורות</h2>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-text-primary">{provider.rating.toFixed(1)}</span>
              <StarRating rating={provider.rating} showNumber={false} size={13} />
            </div>
          </div>
          <div className="space-y-4">
            {visibleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          {provider.reviews.length > 3 && (
            <div className="mt-4 space-y-2">
              {!showAllReviews && (
                <button
                  type="button"
                  onClick={() => setShowAllReviews(true)}
                  className="text-sm font-medium text-blue tap-highlight-none hover:text-blue-dark transition-colors"
                >
                  צפה בכל הביקורות ({provider.reviews.length})
                </button>
              )}
              <button
                type="button"
                onClick={() => router.push(`/providers/${provider.id}/review`)}
                className="block text-sm font-medium text-blue tap-highlight-none hover:text-blue-dark transition-colors"
              >
                כתוב ביקורת
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Sticky book button */}
      <div className="fixed bottom-0 inset-x-0 mx-auto w-full max-w-app bg-white border-t border-surface-border px-4 py-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
        <Button variant="primary" size="lg" fullWidth onClick={handleBook}>
          הזמן תור
        </Button>
      </div>

      {/* Gallery lightbox */}
      {galleryIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setGalleryIndex(null)}
        >
          <button
            type="button"
            aria-label="סגור"
            className="absolute top-4 start-4 w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-white tap-highlight-none"
            onClick={() => setGalleryIndex(null)}
          >
            <X size={18} />
          </button>
          <div className="relative w-full max-w-sm aspect-square rounded-xl overflow-hidden">
            <Image
              src={provider.gallery[galleryIndex]}
              alt="תמונה"
              fill
              className="object-cover"
              sizes="430px"
            />
          </div>
        </div>
      )}
    </AppShell>
  )
}

export default function ProviderProfilePage() {
  return <ProviderProfileContent />
}
