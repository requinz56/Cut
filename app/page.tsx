'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import BottomNav from '@/components/layout/BottomNav'
import SearchBar from '@/components/layout/SearchBar'
import SectionHeader from '@/components/ui/SectionHeader'
import CategoryCard from '@/components/domain/CategoryCard'
import ProviderCard from '@/components/domain/ProviderCard'
import { CATEGORIES, PROVIDERS } from '@/lib/mock-data'
import { useBooking } from '@/context/BookingContext'

function HomeContent() {
  const [search, setSearch] = useState('')
  const router = useRouter()
  const { setProvider } = useBooking()

  const featuredProviders = PROVIDERS.filter((p) => p.isActive)

  const filteredProviders = search.trim()
    ? PROVIDERS.filter(
        (p) =>
          p.businessName.includes(search) ||
          p.location.includes(search) ||
          p.services.some((s) => s.name.includes(search))
      )
    : null

  function handleBook(providerId: string) {
    setProvider(providerId)
    router.push(`/book/service?provider=${providerId}`)
  }

  return (
    <AppShell>
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 border-b border-surface-border">
        <div className="flex items-center justify-between px-4 pt-5 pb-3">
          <div>
            <p className="text-sm text-text-muted">שלום 👋</p>
            <h1 className="text-xl font-bold text-text-primary">מה נעשה היום?</h1>
          </div>
          <button
            type="button"
            onClick={() => router.push('/notifications')}
            aria-label="התראות"
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-surface hover:bg-blue-light transition-colors tap-highlight-none"
          >
            <Bell size={20} className="text-text-secondary" />
            <span className="absolute top-1.5 end-1.5 w-2 h-2 bg-blue rounded-full" />
          </button>
        </div>
        <div className="px-4 pb-3">
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>

      <div className="px-4 py-5 space-y-6">
        {/* Search results */}
        {filteredProviders !== null ? (
          <div>
            <SectionHeader title={`תוצאות חיפוש (${filteredProviders.length})`} className="mb-3" />
            {filteredProviders.length === 0 ? (
              <p className="text-sm text-text-muted text-center py-8">לא נמצאו תוצאות</p>
            ) : (
              <div className="space-y-3">
                {filteredProviders.map((p) => (
                  <ProviderCard
                    key={p.id}
                    provider={p}
                    layout="list"
                    onClick={() => router.push(`/providers/${p.id}`)}
                    onBook={() => handleBook(p.id)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Categories */}
            <div>
              <SectionHeader
                title="קטגוריות"
                actionLabel="הכול"
                onAction={() => router.push('/categories')}
                className="mb-3"
              />
              <div className="flex gap-2 overflow-x-auto scroll-hide pb-1 -mx-4 px-4">
                {CATEGORIES.map((cat) => (
                  <CategoryCard
                    key={cat.id}
                    category={cat}
                    compact
                    onClick={() => router.push(`/providers?category=${cat.id}`)}
                  />
                ))}
              </div>
            </div>

            {/* Featured providers */}
            <div>
              <SectionHeader
                title="מומלצים"
                actionLabel="כולם"
                onAction={() => router.push('/providers')}
                className="mb-3"
              />
              <div className="grid grid-cols-2 gap-3">
                {featuredProviders.slice(0, 4).map((p) => (
                  <ProviderCard
                    key={p.id}
                    provider={p}
                    layout="grid"
                    onClick={() => router.push(`/providers/${p.id}`)}
                    onBook={() => handleBook(p.id)}
                  />
                ))}
              </div>
            </div>

            {/* Popular near you */}
            <div>
              <SectionHeader title="פופולריים בסביבתך" className="mb-3" />
              <div className="space-y-3">
                {featuredProviders
                  .sort((a, b) => b.rating - a.rating)
                  .map((p) => (
                    <ProviderCard
                      key={p.id}
                      provider={p}
                      layout="list"
                      onClick={() => router.push(`/providers/${p.id}`)}
                      onBook={() => handleBook(p.id)}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>

      <BottomNav variant="customer" />
    </AppShell>
  )
}

export default function HomePage() {
  return <HomeContent />
}
