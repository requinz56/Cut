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
        className="bg-white rounded-2xl border border-surface-border/70 shadow-[0_2px_12px_rgba(37,99,235,0.07)] flex gap-3 p-3.5 cursor-pointer active:scale-[0.985] transition-transform tap-highlight-none"
      >
        <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-surface-border/60">
          <Image
            src={provider.avatarUrl}
            alt={provider.businessName}
            fill
            className="object-cover"
            sizes="72px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-blue bg-blue-xlight px-2 py-0.5 rounded-full inline-block mb-1">{category?.label}</p>
          <h3 className="font-bold text-text-primary text-sm leading-tight mb-1">
            {provider.businessName}
          </h3>
          <StarRating rating={provider.rating} reviewCount={provider.reviewCount} size={12} />
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <div className="flex items-center gap-1 min-w-0">
              <MapPin size={11} className="text-text-muted flex-shrink-0" />
              <p className="text-xs text-text-muted truncate">{provider.location}</p>
            </div>
            {provider.isOpenNow && (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-status-confirmed flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-status-confirmed inline-block" />
                פתוח
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end justify-between flex-shrink-0 gap-2">
          <span className="text-xs font-semibold text-text-muted" dir="ltr">
            מ-{formatPrice(provider.priceFrom)}
          </span>
          {onBook && (
            <button
              onClick={(e) => { e.stopPropagation(); onBook(); }}
              className="text-xs font-bold text-white bg-blue px-3 py-1.5 rounded-xl tap-highlight-none hover:bg-blue-dark transition-colors shadow-sm"
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
      className="bg-white rounded-2xl border border-surface-border/70 shadow-[0_2px_12px_rgba(37,99,235,0.07)] overflow-hidden cursor-pointer active:scale-[0.985] transition-transform tap-highlight-none"
    >
      <div className="relative h-40 w-full">
        <Image
          src={provider.coverUrl}
          alt={provider.businessName}
          fill
          className="object-cover"
          sizes="(max-width: 430px) 50vw, 215px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
        {provider.isOpenNow && (
          <div className="absolute top-2.5 start-2.5">
            <span className="flex items-center gap-1 text-[10px] font-bold text-white bg-status-confirmed/90 px-1.5 py-0.5 rounded-full">
              <span className="w-1 h-1 rounded-full bg-white inline-block" />
              פתוח
            </span>
          </div>
        )}
        <div className="absolute bottom-0 inset-x-0 p-3">
          <p className="text-[10px] text-white/80 font-semibold mb-0.5">{category?.label}</p>
          <h3 className="font-bold text-white text-sm leading-tight">{provider.businessName}</h3>
        </div>
      </div>
      <div className="p-3 pt-2.5">
        <StarRating rating={provider.rating} reviewCount={provider.reviewCount} size={12} />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs font-semibold text-text-muted" dir="ltr">
            מ-{formatPrice(provider.priceFrom)}
          </span>
          {onBook && (
            <button
              onClick={(e) => { e.stopPropagation(); onBook(); }}
              className="text-xs font-bold text-white bg-blue px-3 py-1.5 rounded-xl tap-highlight-none hover:bg-blue-dark transition-colors shadow-sm"
            >
              הזמן תור
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
