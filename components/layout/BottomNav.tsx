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
  { href: '/owner',              label: 'בית',      icon: <Home size={22} /> },
  { href: '/owner/appointments', label: 'תורים',    icon: <Calendar size={22} /> },
  { href: '/owner/staff',        label: 'צוות',     icon: <Users size={22} /> },
  { href: '/owner/services',     label: 'שירותים',  icon: <Scissors size={22} /> },
  { href: '/owner/settings',     label: 'הגדרות',   icon: <Settings size={22} /> },
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
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-app bg-white border-t border-surface-border shadow-nav z-40"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-stretch h-16">
        {tabs.map((tab) => {
          const active = isActive(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={[
                'flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors tap-highlight-none',
                active ? 'text-blue' : 'text-text-muted hover:text-text-secondary',
              ].join(' ')}
            >
              <span className={active ? 'text-blue' : ''}>{tab.icon}</span>
              <span className={`text-xs font-medium ${active ? 'text-blue' : ''}`}>
                {tab.label}
              </span>
              {active && (
                <span className="absolute bottom-0 w-6 h-0.5 bg-blue rounded-full" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
