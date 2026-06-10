'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Bell } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import BottomNav from '@/components/layout/BottomNav'
import SearchBar from '@/components/layout/SearchBar'
import SectionHeader from '@/components/ui/SectionHeader'
import Skeleton from '@/components/ui/Skeleton'
import CategoryCard from '@/components/domain/CategoryCard'
import ProviderCard from '@/components/domain/ProviderCard'
import { CATEGORIES, PROVIDERS } from '@/lib/mock-data'
import { useBooking } from '@/context/BookingContext'
import { useDebounce } from '@/hooks/useDebounce'
import type { Appointment } from '@/types'

function getGreeting(): { sub: string; main: string } {
  const h = new Date().getHours()
  if (h >= 5 && h < 11)  return { sub: 'בוקר טוב ☀️',    main: 'מה נקבע היום?' }
  if (h >= 11 && h < 17) return { sub: 'צהריים טובים 🌤', main: 'מה נקבע עכשיו?' }
  if (h >= 17 && h < 21) return { sub: 'ערב טוב 🌙',      main: 'הזמן תור לעכשיו' }
  return                         { sub: 'לילה טוב 🌙',     main: 'הזמן מראש' }
}

function HomeContent() {
  const [search, setSearch] = useState('')
  const [mounted, setMounted] = useState(false)
  const [recentProviderIds, setRecentProviderIds] = useState<string[]>([])
  const router = useRouter()
  const { setProvider } = useBooking()
  const debouncedSearch = useDebounce(search, 300)
  const greeting = useMemo(getGreeting, [])

  useEffect(() => {
    setMounted(true)
    try {
      const raw = localStorage.getItem('appointments')
      if (raw) {
        const apts: Appointment[] = JSON.parse(raw)
        const seen = new Set<string>()
        const ids: string[] = []
        for (const a of [...apts].reverse()) {
          if (!seen.has(a.providerId)) {
            seen.add(a.providerId)
            ids.push(a.providerId)
          }
          if (ids.length >= 3) break
        }
        setRecentProviderIds(ids)
      }
    } catch {
      // ignore corrupt localStorage
    }
  }, [])

  const featuredProviders = PROVIDERS.filter((p) => p.isActive)

  const filteredProviders = debouncedSearch.trim()
    ? PROVIDERS.filter(
        (p) =>
          p.businessName.includes(debouncedSearch) ||
          p.location.includes(debouncedSearch) ||
          p.services.some((s) => s.name.includes(debouncedSearch))
      )
    : null

  const recentProviders = recentProviderIds
    .map((id) => PROVIDERS.find((p) => p.id === id))
    .filter(Boolean) as typeof PROVIDERS

  function handleBook(providerId: string) {
    setProvider(providerId)
    router.push(`/book/service?provider=${providerId}`)
  }

  return (
    <AppShell>
      {/* Hero Section */}
      <div className="hero-gradient sticky top-0 z-30 px-4 pt-7 pb-5 overflow-hidden">
        <div className="hero-shine" aria-hidden="true" />
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm text-white/65 font-medium mb-0.5">{greeting.sub}</p>
            <h1 className="text-3xl font-extrabold text-white leading-tight">{greeting.main}</h1>
          </div>
          <button
            type="button"
            onClick={() => router.push('/notifications')}
            aria-label="התראות"
            className="relative w-11 h-11 flex items-center justify-center rounded-full bg-white/15 border border-white/20 hover:bg-white/25 transition-colors tap-highlight-none"
          >
            <Bell size={20} className="text-white" />
            <span className="absolute top-1.5 end-1.5 w-2 h-2 bg-white rounded-full" />
          </button>
        </div>
        {/* Search as white floating card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-blue/10 overflow-hidden">
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>

      <div className="px-4 py-5 space-y-8">
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
            {/* Quick rebook from recent appointments */}
            {mounted && recentProviders.length > 0 && (
              <div>
                <SectionHeader title="תורים אחרונים" className="mb-3" />
                <div className="flex gap-3 overflow-x-auto scroll-hide pb-1 -mx-4 px-4">
                  {recentProviders.map((p) => (
                    <div
                      key={p.id}
                      className="flex-shrink-0 bg-white rounded-2xl border border-surface-border/70 shadow-[0_2px_10px_rgba(37,99,235,0.07)] p-3 flex items-center gap-2.5 min-w-[190px]"
                    >
                      <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-surface-border/50">
                        <Image
                          src={p.avatarUrl}
                          alt={p.businessName}
                          fill
                          className="object-cover"
                          sizes="36px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-text-primary truncate">{p.businessName}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleBook(p.id)}
                        className="flex-shrink-0 text-[11px] font-bold text-blue bg-blue-xlight border border-blue/25 px-2.5 py-1 rounded-lg tap-highlight-none hover:bg-blue-light transition-colors"
                      >
                        הזמן שוב
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            <div>
              <SectionHeader
                title="קטגוריות"
                actionLabel="הכול"
                onAction={() => router.push('/categories')}
                className="mb-3"
              />
              {!mounted ? (
                <div className="flex gap-2 overflow-x-auto scroll-hide pb-1 -mx-4 px-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} variant="category" />
                  ))}
                </div>
              ) : (
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
              )}
            </div>

            {/* Featured providers */}
            <div>
              <SectionHeader
                title="מומלצים"
                actionLabel="כולם"
                onAction={() => router.push('/providers')}
                className="mb-3"
              />
              {!mounted ? (
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} variant="card-grid" />
                  ))}
                </div>
              ) : (
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
              )}
            </div>

            {/* Popular near you */}
            <div>
              <SectionHeader title="פופולריים בסביבתך" className="mb-3" />
              {!mounted ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} variant="card-list" />
                  ))}
                </div>
              ) : (
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
              )}
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
