'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SlidersHorizontal } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import BottomNav from '@/components/layout/BottomNav'
import PageHeader from '@/components/layout/PageHeader'
import CategoryCard from '@/components/domain/CategoryCard'
import ProviderCard from '@/components/domain/ProviderCard'
import SortFilterSheet, { type SortOption } from '@/components/domain/SortFilterSheet'
import { CATEGORIES, PROVIDERS } from '@/lib/mock-data'
import { useBooking } from '@/context/BookingContext'
import type { Provider } from '@/types'

function sortProviders(providers: Provider[], sort: SortOption): Provider[] {
  const list = [...providers]
  if (sort === 'rating')     return list.sort((a, b) => b.rating - a.rating)
  if (sort === 'price-asc')  return list.sort((a, b) => a.priceFrom - b.priceFrom)
  if (sort === 'price-desc') return list.sort((a, b) => b.priceFrom - a.priceFrom)
  if (sort === 'name')       return list.sort((a, b) => a.businessName.localeCompare(b.businessName, 'he'))
  return list
}

function ProvidersContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') ?? 'all'
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [sort, setSort] = useState<SortOption>('rating')
  const [sheetOpen, setSheetOpen] = useState(false)
  const { setProvider } = useBooking()

  const filtered =
    selectedCategory === 'all'
      ? PROVIDERS.filter((p) => p.isActive)
      : PROVIDERS.filter((p) => p.isActive && p.category === selectedCategory)

  const sorted = sortProviders(filtered, sort)

  function handleBook(providerId: string) {
    setProvider(providerId)
    router.push(`/book/service?provider=${providerId}`)
  }

  const categoryLabel =
    selectedCategory === 'all'
      ? 'כל העסקים'
      : CATEGORIES.find((c) => c.id === selectedCategory)?.label ?? selectedCategory

  const isNonDefaultSort = sort !== 'rating'

  return (
    <AppShell>
      <PageHeader title={categoryLabel} />

      {/* Category filter strip */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-surface-border sticky top-[61px] z-20">
        <div className="flex gap-2 overflow-x-auto scroll-hide px-4 py-3 -mx-0">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={[
              'flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-all tap-highlight-none flex-shrink-0',
              selectedCategory === 'all'
                ? 'bg-blue text-white border-blue shadow-sm'
                : 'bg-blue-xlight text-blue border-blue/20 hover:bg-blue-light hover:border-blue/40',
            ].join(' ')}
          >
            <span>🏪</span>
            <span>הכול</span>
          </button>
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              compact
              selected={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      <div className="px-4 py-4 space-y-3 pb-24">
        {sorted.length === 0 ? (
          <p className="text-sm text-text-muted text-center py-12">לא נמצאו עסקים בקטגוריה זו</p>
        ) : (
          sorted.map((p) => (
            <ProviderCard
              key={p.id}
              provider={p}
              layout="list"
              onClick={() => router.push(`/providers/${p.id}`)}
              onBook={() => handleBook(p.id)}
            />
          ))
        )}
      </div>

      {/* Sort FAB */}
      <button
        type="button"
        onClick={() => setSheetOpen(true)}
        aria-label="מיון ופילטר"
        className="fixed bottom-24 start-4 z-30 flex items-center gap-2 bg-white border border-surface-border shadow-card-hover rounded-full px-4 py-2.5 text-sm font-semibold text-text-primary tap-highlight-none hover:bg-blue-xlight transition-colors"
      >
        <SlidersHorizontal size={16} className={isNonDefaultSort ? 'text-blue' : 'text-text-secondary'} />
        <span className={isNonDefaultSort ? 'text-blue' : ''}>מיון</span>
        {isNonDefaultSort && (
          <span className="w-2 h-2 rounded-full bg-blue flex-shrink-0" />
        )}
      </button>

      <SortFilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        selected={sort}
        onSelect={setSort}
      />

      <BottomNav variant="customer" />
    </AppShell>
  )
}

export default function ProvidersPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center text-text-muted">טוען...</div>}>
      <ProvidersContent />
    </Suspense>
  )
}
