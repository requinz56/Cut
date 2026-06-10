'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Calendar,
  Bell,
  User,
  Users,
  Scissors,
  Settings,
} from 'lucide-react'
import { SAMPLE_NOTIFICATIONS } from '@/lib/mock-data'

const UNREAD_COUNT = SAMPLE_NOTIFICATIONS.filter((n) => !n.read).length

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
}

const CUSTOMER_TABS: NavItem[] = [
  { href: '/',               label: 'בית',      icon: <Home size={22} /> },
  { href: '/appointments',   label: 'תורים',    icon: <Calendar size={22} /> },
  { href: '/notifications',  label: 'התראות',   icon: <Bell size={22} /> },
  { href: '/profile',        label: 'פרופיל',   icon: <User size={22} /> },
]

const OWNER_TABS: NavItem[] = [
  { href: '/owner',              label: 'בית',      icon: <Home size={20} /> },
  { href: '/owner/appointments', label: 'תורים',    icon: <Calendar size={20} /> },
  { href: '/owner/staff',        label: 'צוות',     icon: <Users size={20} /> },
  { href: '/owner/services',     label: 'שירותים',  icon: <Scissors size={20} /> },
  { href: '/owner/settings',     label: 'הגדרות',   icon: <Settings size={20} /> },
]

interface BottomNavProps {
  variant?: 'customer' | 'owner'
}

export default function BottomNav({ variant = 'customer' }: BottomNavProps) {
  const pathname = usePathname()
  const tabs = variant === 'owner' ? OWNER_TABS : CUSTOMER_TABS

  function isActive(href: string) {
    if (href === '/' || href === '/owner') return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-app glass-nav shadow-nav z-40"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-stretch h-[72px]">
        {tabs.map((tab) => {
          const active = isActive(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={[
                'flex-1 flex flex-col items-center justify-center gap-1 transition-all tap-highlight-none relative py-2',
                active
                  ? 'text-blue'
                  : 'text-text-muted opacity-70 hover:opacity-100 hover:text-text-secondary',
              ].join(' ')}
            >
              <span className="relative">
                {tab.icon}
                {variant === 'customer' && tab.href === '/notifications' && UNREAD_COUNT > 0 && (
                  <span className="absolute -top-1 -end-1 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[9px] font-bold leading-none">
                    {UNREAD_COUNT}
                  </span>
                )}
              </span>
              <span className={`text-xs ${active ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
              {active && (
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue pointer-events-none" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
