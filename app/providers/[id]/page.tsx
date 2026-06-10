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
      <div className="relative h-52 w-full">
        <Image
          src={provider.coverUrl}
          alt={provider.businessName}
          fill
          className="object-cover"
          priority
          sizes="430px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="חזרה"
          className="absolute top-4 end-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center tap-highlight-none shadow-md"
        >
          <ChevronRight size={20} className="text-text-primary" strokeWidth={2.5} />
        </button>
      </div>

      {/* Business header */}
      <div className="px-4 pt-3 pb-4 bg-white border-b border-surface-border/70">
        <div className="flex items-start gap-3">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 -mt-10 border-2 border-white shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
            <Image
              src={provider.avatarUrl}
              alt={provider.businessName}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div className="flex-1 pt-0.5">
            <p className="text-[11px] text-blue font-bold opacity-80 mb-0.5">{category?.label}</p>
            <h1 className="text-lg font-extrabold text-text-primary leading-tight">{provider.businessName}</h1>
            <div className="mt-1">
              <StarRating rating={provider.rating} reviewCount={provider.reviewCount} size={13} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-3">
          <MapPin size={13} className="text-text-muted flex-shrink-0" />
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
                  className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 tap-highlight-none border border-surface-border/50 shadow-sm active:scale-95 transition-transform"
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
        <section className="px-4 py-5 border-b border-surface-border/70">
          <SectionHeader title="שירותים ומחירים" className="mb-3" />
          <div className="space-y-2">
            {provider.services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-surface-border/70 px-4 py-3 flex items-center justify-between shadow-[0_1px_4px_rgba(37,99,235,0.04)]"
              >
                <div>
                  <p className="text-sm font-bold text-text-primary">{service.name}</p>
                  <p className="text-xs text-text-muted mt-0.5">{service.durationMins} דקות</p>
                </div>
                <span className="text-sm font-bold text-blue" dir="ltr">
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
        <section className="px-4 py-5 border-b border-surface-border/70">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-extrabold text-text-primary">ביקורות</h2>
            <div className="flex items-center gap-1.5 bg-blue-xlight px-2.5 py-1 rounded-full">
              <span className="text-xs font-bold text-blue">{provider.rating.toFixed(1)}</span>
              <StarRating rating={provider.rating} showNumber={false} size={12} />
            </div>
          </div>
          <div className="space-y-2.5">
            {visibleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          {provider.reviews.length > 3 && (
            <div className="mt-4 flex gap-3">
              {!showAllReviews && (
                <button
                  type="button"
                  onClick={() => setShowAllReviews(true)}
                  className="text-xs font-semibold text-blue bg-blue-xlight border border-blue/20 px-3 py-1.5 rounded-xl tap-highlight-none hover:bg-blue-light transition-colors"
                >
                  כל הביקורות ({provider.reviews.length})
                </button>
              )}
              <button
                type="button"
                onClick={() => router.push(`/providers/${provider.id}/review`)}
                className="text-xs font-semibold text-text-secondary bg-surface border border-surface-border px-3 py-1.5 rounded-xl tap-highlight-none hover:border-blue/30 hover:text-blue transition-colors"
              >
                כתוב ביקורת
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Sticky book button */}
      <div className="fixed bottom-0 inset-x-0 mx-auto w-full max-w-app bg-white/95 backdrop-blur-sm border-t border-surface-border/70 px-4 py-3.5 pb-[calc(14px+env(safe-area-inset-bottom))]">
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
