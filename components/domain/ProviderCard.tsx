'use client'

import Image from 'next/image'
import { MapPin } from 'lucide-react'
import type { Provider } from '@/types'
import { CATEGORIES } from '@/lib/mock-data'
import { formatPrice } from '@/lib/format'
import StarRating from '@/components/ui/StarRating'

interface ProviderCardProps {
  provider: Provider
  onClick?: () => void
  onBook?: () => void
  layout?: 'grid' | 'list'
}

export default function ProviderCard({
  provider,
  onClick,
  onBook,
  layout = 'grid',
}: ProviderCardProps) {
  const category = CATEGORIES.find((c) => c.id === provider.category)

  if (layout === 'list') {
    return (
      <div
        onClick={onClick}
        className="bg-white rounded-xl border border-surface-border border-e-2 border-e-blue shadow-card flex gap-3 p-3.5 cursor-pointer active:scale-[0.99] transition-transform tap-highlight-none"
      >
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={provider.avatarUrl}
            alt={provider.businessName}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-blue font-semibold mb-0.5">{category?.label}</p>
          <h3 className="font-semibold text-text-primary text-sm leading-tight mb-1">
            {provider.businessName}
          </h3>
          <StarRating rating={provider.rating} reviewCount={provider.reviewCount} size={12} />
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <div className="flex items-center gap-1 min-w-0">
              <MapPin size={11} className="text-text-muted flex-shrink-0" />
              <p className="text-xs text-text-muted truncate">{provider.location}</p>
            </div>
            {provider.isOpenNow && (
              <span className="flex items-center gap-1 text-xs font-semibold text-status-confirmed flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-status-confirmed inline-block" />
                פתוח עכשיו
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end justify-between flex-shrink-0">
          <span className="text-sm font-semibold text-text-primary" dir="ltr">
            מ-{formatPrice(provider.priceFrom)}
          </span>
          {onBook && (
            <button
              onClick={(e) => { e.stopPropagation(); onBook(); }}
              className="text-xs font-semibold text-white bg-gradient-to-b from-blue-accent to-blue px-3 py-1.5 rounded-full tap-highlight-none hover:from-blue hover:to-blue-dark transition-all"
            >
              הזמן
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-surface-border shadow-card overflow-hidden cursor-pointer active:scale-[0.99] transition-transform tap-highlight-none"
    >
      <div className="relative h-44 w-full">
        <Image
          src={provider.coverUrl}
          alt={provider.businessName}
          fill
          className="object-cover"
          sizes="(max-width: 430px) 50vw, 215px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 p-3">
          <p className="text-xs text-white/75 font-medium mb-0.5">{category?.label}</p>
          <h3 className="font-bold text-white text-sm leading-tight">{provider.businessName}</h3>
        </div>
      </div>
      <div className="p-3 pt-2.5">
        <StarRating rating={provider.rating} reviewCount={provider.reviewCount} size={12} />
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-semibold text-text-primary" dir="ltr">
            מ-{formatPrice(provider.priceFrom)}
          </span>
          {onBook && (
            <button
              onClick={(e) => { e.stopPropagation(); onBook(); }}
              className="text-xs font-semibold text-white bg-gradient-to-b from-blue-accent to-blue px-3 py-1.5 rounded-full tap-highlight-none hover:from-blue hover:to-blue-dark transition-all"
            >
              הזמן
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
