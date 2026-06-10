'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AppShell from '@/components/layout/AppShell'
import BottomNav from '@/components/layout/BottomNav'
import PageHeader from '@/components/layout/PageHeader'
import CategoryCard from '@/components/domain/CategoryCard'
import ProviderCard from '@/components/domain/ProviderCard'
import { CATEGORIES, PROVIDERS } from '@/lib/mock-data'
import { useBooking } from '@/context/BookingContext'

function ProvidersContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') ?? 'all'
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const { setProvider } = useBooking()

  const filtered =
    selectedCategory === 'all'
      ? PROVIDERS.filter((p) => p.isActive)
      : PROVIDERS.filter((p) => p.isActive && p.category === selectedCategory)

  function handleBook(providerId: string) {
    setProvider(providerId)
    router.push(`/book/service?provider=${providerId}`)
  }

  const categoryLabel =
    selectedCategory === 'all'
      ? 'כל העסקים'
      : CATEGORIES.find((c) => c.id === selectedCategory)?.label ?? selectedCategory

  return (
    <AppShell>
      <PageHeader title={categoryLabel} />

      {/* Category filter strip */}
      <div className="bg-white border-b border-surface-border sticky top-[61px] z-20">
        <div className="flex gap-2 overflow-x-auto scroll-hide px-4 py-3 -mx-0">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={[
              'flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-all tap-highlight-none flex-shrink-0',
              selectedCategory === 'all'
                ? 'bg-blue text-white border-blue'
                : 'bg-white text-text-secondary border-surface-border hover:border-blue hover:text-blue',
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

      <div className="px-4 py-4 space-y-3">
        {filtered.length === 0 ? (
          <p className="text-sm text-text-muted text-center py-12">לא נמצאו עסקים בקטגוריה זו</p>
        ) : (
          filtered.map((p) => (
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
