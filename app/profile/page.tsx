'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Edit2, ChevronLeft, Bell, Shield, HelpCircle, LogOut } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import BottomNav from '@/components/layout/BottomNav'
import PageHeader from '@/components/layout/PageHeader'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { CURRENT_USER } from '@/lib/mock-data'
import { useAppointments } from '@/hooks/useAppointments'

interface MenuItem {
  icon: React.ReactNode
  label: string
  onClick: () => void
  danger?: boolean
}

export default function ProfilePage() {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(CURRENT_USER.name)
  const [phone, setPhone] = useState(CURRENT_USER.phone)
  const { upcoming, past } = useAppointments()

  const menuItems: MenuItem[] = [
    {
      icon: <Bell size={18} />,
      label: 'הגדרות התראות',
      onClick: () => router.push('/notifications'),
    },
    {
      icon: <Shield size={18} />,
      label: 'פרטיות ואבטחה',
      onClick: () => {},
    },
    {
      icon: <HelpCircle size={18} />,
      label: 'עזרה ותמיכה',
      onClick: () => {},
    },
    {
      icon: <LogOut size={18} />,
      label: 'יציאה מהחשבון',
      onClick: () => {},
      danger: true,
    },
  ]

  return (
    <AppShell>
      <PageHeader title="הפרופיל שלי" showBack={false} />

      {/* Avatar + stats */}
      <div className="px-4 py-6 flex flex-col items-center text-center border-b border-surface-border">
        <div className="relative mb-3">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-blue-light">
            {CURRENT_USER.avatarUrl ? (
              <Image
                src={CURRENT_USER.avatarUrl}
                alt={name}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="w-full h-full bg-blue-light flex items-center justify-center text-blue font-bold text-2xl">
                {name.charAt(0)}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setEditing(true)}
            aria-label="ערוך פרופיל"
            className="absolute -bottom-1 -start-1 w-7 h-7 bg-blue rounded-full flex items-center justify-center text-white tap-highlight-none"
          >
            <Edit2 size={12} />
          </button>
        </div>
        <h2 className="text-xl font-bold text-text-primary">{name}</h2>
        <p className="text-sm text-text-muted mt-0.5" dir="ltr">{phone}</p>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-4">
          <div className="text-center">
            <p className="text-xl font-bold text-text-primary">{upcoming.length}</p>
            <p className="text-xs text-text-muted">תורים קרובים</p>
          </div>
          <div className="w-px h-8 bg-surface-border" />
          <div className="text-center">
            <p className="text-xl font-bold text-text-primary">{past.length}</p>
            <p className="text-xs text-text-muted">ביקורים</p>
          </div>
        </div>
      </div>

      {/* Edit form */}
      {editing && (
        <div className="px-4 py-5 border-b border-surface-border space-y-4">
          <Input label="שם מלא" value={name} onChange={setName} />
          <Input label="מספר טלפון" value={phone} onChange={setPhone} type="tel" dir="ltr" />
          <div className="flex gap-3">
            <Button variant="primary" size="md" fullWidth onClick={() => setEditing(false)}>
              שמור
            </Button>
            <Button variant="ghost" size="md" fullWidth onClick={() => setEditing(false)}>
              ביטול
            </Button>
          </div>
        </div>
      )}

      {/* Menu items */}
      <div className="divide-y divide-surface-border">
        {menuItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.onClick}
            className={[
              'w-full flex items-center gap-3 px-4 py-4 transition-colors tap-highlight-none hover:bg-surface',
              item.danger ? 'text-status-cancelled' : 'text-text-primary',
            ].join(' ')}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            <span className="flex-1 text-start text-sm font-medium">{item.label}</span>
            {!item.danger && <ChevronLeft size={16} className="text-text-muted" />}
          </button>
        ))}
      </div>

      {/* Owner mode link */}
      <div className="px-4 py-4 border-t border-surface-border">
        <button
          type="button"
          onClick={() => router.push('/owner')}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-surface border border-surface-border text-sm font-medium text-text-secondary hover:border-blue hover:text-blue transition-colors tap-highlight-none"
        >
          <span>מעבר לממשק בעל עסק</span>
          <ChevronLeft size={16} />
        </button>
      </div>

      <BottomNav variant="customer" />
    </AppShell>
  )
}
