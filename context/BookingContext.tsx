'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { BookingDraft, Appointment, Provider, Service } from '@/types'
import { PROVIDERS } from '@/lib/mock-data'

interface BookingContextValue {
  draft: BookingDraft
  provider: Provider | null
  service: Service | null
  setProvider: (id: string) => void
  setService: (id: string) => void
  setDateTime: (date: string, time: string) => void
  confirmBooking: () => Appointment
  resetBooking: () => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

const INITIAL_DRAFT: BookingDraft = { step: 1 }

export function BookingProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<BookingDraft>(INITIAL_DRAFT)

  const provider = draft.providerId
    ? (PROVIDERS.find((p) => p.id === draft.providerId) ?? null)
    : null

  const service = provider && draft.serviceId
    ? (provider.services.find((s) => s.id === draft.serviceId) ?? null)
    : null

  const setProvider = useCallback((id: string) => {
    setDraft({ step: 2, providerId: id })
  }, [])

  const setService = useCallback((id: string) => {
    setDraft((prev) => ({ ...prev, step: 3, serviceId: id }))
  }, [])

  const setDateTime = useCallback((date: string, time: string) => {
    setDraft((prev) => ({ ...prev, step: 4, date, time }))
  }, [])

  const confirmBooking = useCallback((): Appointment => {
    if (!provider || !service || !draft.date || !draft.time) {
      throw new Error('Incomplete booking draft')
    }
    const appointment: Appointment = {
      id: `apt-${Date.now()}`,
      providerId: provider.id,
      providerName: provider.businessName,
      providerAvatar: provider.avatarUrl,
      serviceId: service.id,
      serviceName: service.name,
      durationMins: service.durationMins,
      priceILS: service.priceILS,
      date: draft.date,
      time: draft.time,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    }
    // Persist to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('tor5:appointments') ?? '[]') as Appointment[]
      localStorage.setItem('tor5:appointments', JSON.stringify([appointment, ...existing]))
    } catch {
      // localStorage may be unavailable (SSR guard)
    }
    return appointment
  }, [provider, service, draft])

  const resetBooking = useCallback(() => {
    setDraft(INITIAL_DRAFT)
  }, [])

  return (
    <BookingContext.Provider
      value={{ draft, provider, service, setProvider, setService, setDateTime, confirmBooking, resetBooking }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}
