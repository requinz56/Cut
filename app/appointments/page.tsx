'use client'

import { useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import BottomNav from '@/components/layout/BottomNav'
import PageHeader from '@/components/layout/PageHeader'
import AppointmentCard from '@/components/domain/AppointmentCard'
import { useAppointments } from '@/hooks/useAppointments'

type Tab = 'upcoming' | 'past'

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('upcoming')
  const { upcoming, past, cancelAppointment } = useAppointments()

  const list = activeTab === 'upcoming' ? upcoming : past

  return (
    <AppShell>
      <PageHeader title="התורים שלי" showBack={false} />

      {/* Tabs */}
      <div className="flex border-b border-surface-border mx-4">
        {(['upcoming', 'past'] as Tab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={[
              'flex-1 py-3 text-sm font-medium transition-colors tap-highlight-none',
              activeTab === tab
                ? 'text-blue border-b-2 border-blue'
                : 'text-text-muted hover:text-text-secondary',
            ].join(' ')}
          >
            {tab === 'upcoming' ? `קרובים (${upcoming.length})` : `עברו (${past.length})`}
          </button>
        ))}
      </div>

      <div className="px-4 py-4 space-y-3">
        {list.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <span className="text-4xl mb-3">📅</span>
            <p className="font-medium text-text-primary mb-1">
              {activeTab === 'upcoming' ? 'אין תורים קרובים' : 'אין תורים קודמים'}
            </p>
            <p className="text-sm text-text-muted">
              {activeTab === 'upcoming' ? 'קבע את התור הראשון שלך עכשיו' : 'התורים שסיימת יופיעו כאן'}
            </p>
          </div>
        ) : (
          list.map((apt) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              onCancel={
                apt.status === 'confirmed' || apt.status === 'pending'
                  ? () => cancelAppointment(apt.id)
                  : undefined
              }
            />
          ))
        )}
      </div>

      <BottomNav variant="customer" />
    </AppShell>
  )
}
