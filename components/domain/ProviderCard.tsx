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
        className="bg-white rounded-lg border border-surface-border shadow-card flex gap-3 p-3 cursor-pointer active:scale-[0.99] transition-transform tap-highlight-none"
      >
        <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={provider.avatarUrl}
            alt={provider.businessName}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-blue font-medium mb-0.5">{category?.label}</p>
          <h3 className="font-semibold text-text-primary text-sm leading-tight mb-1">
            {provider.businessName}
          </h3>
          <StarRating rating={provider.rating} reviewCount={provider.reviewCount} size={12} />
          <div className="flex items-center gap-1 mt-1.5">
            <MapPin size={11} className="text-text-muted flex-shrink-0" />
            <p className="text-xs text-text-muted truncate">{provider.location}</p>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between flex-shrink-0">
          <span className="text-sm font-semibold text-text-primary" dir="ltr">
            מ-{formatPrice(provider.priceFrom)}
          </span>
          {onBook && (
            <button
              onClick={(e) => { e.stopPropagation(); onBook(); }}
              className="text-xs font-medium text-white bg-blue px-3 py-1.5 rounded-full tap-highlight-none hover:bg-blue-dark transition-colors"
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
      className="bg-white rounded-lg border border-surface-border shadow-card overflow-hidden cursor-pointer active:scale-[0.99] transition-transform tap-highlight-none"
    >
      <div className="relative h-36 w-full">
        <Image
          src={provider.coverUrl}
          alt={provider.businessName}
          fill
          className="object-cover"
          sizes="(max-width: 430px) 50vw, 215px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
      <div className="p-3">
        <p className="text-xs text-blue font-medium mb-0.5">{category?.label}</p>
        <h3 className="font-semibold text-text-primary text-sm leading-tight mb-1.5">
          {provider.businessName}
        </h3>
        <StarRating rating={provider.rating} reviewCount={provider.reviewCount} size={12} />
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-semibold text-text-primary" dir="ltr">
            מ-{formatPrice(provider.priceFrom)}
          </span>
          {onBook && (
            <button
              onClick={(e) => { e.stopPropagation(); onBook(); }}
              className="text-xs font-medium text-white bg-blue px-3 py-1.5 rounded-full tap-highlight-none hover:bg-blue-dark transition-colors"
            >
              הזמן
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
