'use client'

import { useState } from 'react'
import { Bell, CheckCircle, Calendar, Info } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import BottomNav from '@/components/layout/BottomNav'
import PageHeader from '@/components/layout/PageHeader'
import { SAMPLE_NOTIFICATIONS } from '@/lib/mock-data'
import type { Notification } from '@/types'

const TYPE_ICONS: Record<Notification['type'], React.ReactNode> = {
  reminder: <Bell size={16} className="text-blue" />,
  confirmation: <CheckCircle size={16} className="text-status-confirmed" />,
  cancellation: <Calendar size={16} className="text-status-cancelled" />,
  system: <Info size={16} className="text-text-muted" />,
}

function formatRelativeDate(dateStr: string): string {
  const d = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'היום'
  if (diffDays === 1) return 'אתמול'
  if (diffDays < 7) return `לפני ${diffDays} ימים`
  return d.toLocaleDateString('he-IL', { day: 'numeric', month: 'short' })
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS)

  function markRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const hasUnread = notifications.some((n) => !n.read)

  return (
    <AppShell>
      <PageHeader
        title="התראות"
        showBack={false}
        action={hasUnread ? { label: 'סמן הכול כנקרא', onClick: markAllRead } : undefined}
      />

      <div className="divide-y divide-surface-border">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center px-4">
            <Bell size={36} className="text-text-muted mb-3" />
            <p className="font-medium text-text-primary">אין התראות</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markRead(notif.id)}
              className={[
                'flex items-start gap-3 px-4 py-4 cursor-pointer tap-highlight-none transition-colors',
                notif.read ? 'bg-white' : 'bg-blue-light/40',
              ].join(' ')}
            >
              <div className={[
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                notif.read ? 'bg-surface' : 'bg-white',
              ].join(' ')}>
                {TYPE_ICONS[notif.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-medium leading-tight ${notif.read ? 'text-text-secondary' : 'text-text-primary'}`}>
                    {notif.title}
                  </p>
                  <span className="text-xs text-text-muted flex-shrink-0 mt-0.5">
                    {formatRelativeDate(notif.date)}
                  </span>
                </div>
                <p className="text-sm text-text-muted mt-0.5 leading-snug">{notif.body}</p>
              </div>
              {!notif.read && (
                <span className="w-2 h-2 bg-blue rounded-full flex-shrink-0 mt-2" />
              )}
            </div>
          ))
        )}
      </div>

      <BottomNav variant="customer" />
    </AppShell>
  )
}
