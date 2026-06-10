# Visual Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full visual polish pass across all screens to make TOR5 feel like a professional, premium Hebrew RTL appointment-booking product — consistent elevated cards, clean pill nav, and polished typography.

**Architecture:** Component-first — polish shared primitives in `components/domain/` and `components/layout/` first so all screens inherit improvements automatically, then handle screen-specific spacing and booking flow pages.

**Tech Stack:** Next.js 14 App Router, Tailwind CSS (custom palette — `blue`, `blue-xlight`, `blue-light`, `surface`, `text-primary/secondary/muted`, `status-*`), Lucide React icons, RTL (dir="rtl").

**Design spec:** `docs/superpowers/specs/2026-06-10-visual-polish-design.md`

---

## File Map

| File | Change |
|---|---|
| `components/domain/AppointmentCard.tsx` | Remove status border stripe → elevated shadow; upgrade pills/badge/price |
| `components/domain/ProviderCard.tsx` | Remove border-e accent → elevated shadow; upgrade list button/avatar/badge |
| `components/domain/ServiceCard.tsx` | Upgrade selected ring glow and checkmark |
| `components/domain/TimeSlotGrid.tsx` | Upgrade hover and selected shadow |
| `components/domain/SortFilterSheet.tsx` | Minor polish on active option shadow |
| `components/domain/ReviewCard.tsx` | Upgrade avatar gradient background |
| `components/domain/StaffCard.tsx` | Replace border with elevated shadow; avatar gradient |
| `components/layout/BottomNav.tsx` | Active item → pill highlight (bg-blue-xlight); remove bottom dot |
| `components/layout/PageHeader.tsx` | Center title using 3-column layout; increase to text-xl |
| `app/page.tsx` | Recent providers card → elevated shadow; hero greeting weight |
| `app/book/confirm/page.tsx` | Summary card → elevated shadow; provider avatar → rounded-xl |
| `app/booking-success/page.tsx` | Success icon → gradient bg + shadow; summary card → elevated shadow |
| `app/owner/page.tsx` | Stats cards → elevated shadow; today rows → elevated shadow |
| `app/owner/settings/page.tsx` | Save button → gradient CTA with shadow |

---

## Task 1: AppointmentCard — elevated shadow + upgraded pills

**Files:**
- Modify: `components/domain/AppointmentCard.tsx`

The current card uses a thick RTL border stripe (`border-e-[5px]`) for status color. Replace with a uniform elevated shadow and a small status dot next to the badge.

- [ ] **Step 1: Apply changes**

Replace the entire file content:

```tsx
'use client'

import Image from 'next/image'
import { Clock, Calendar } from 'lucide-react'
import type { Appointment } from '@/types'

const STATUS_DOT: Record<string, string> = {
  confirmed: 'bg-status-confirmed',
  pending:   'bg-status-pending',
  cancelled: 'bg-status-cancelled',
  completed: 'bg-status-completed',
}

import StatusBadge from '@/components/ui/StatusBadge'
import { formatDateIL } from '@/lib/date-utils'
import { formatPrice } from '@/lib/format'

interface AppointmentCardProps {
  appointment: Appointment
  onCancel?: () => void
  onClick?: () => void
}

export default function AppointmentCard({ appointment, onCancel, onClick }: AppointmentCardProps) {
  const isUpcoming =
    appointment.status === 'confirmed' || appointment.status === 'pending'

  return (
    <div
      onClick={onClick}
      className={[
        'bg-white rounded-xl p-4',
        'shadow-[0_4px_20px_rgba(27,79,216,0.10),_0_1px_4px_rgba(0,0,0,0.03)]',
        'hover:shadow-[0_6px_24px_rgba(27,79,216,0.14),_0_2px_6px_rgba(0,0,0,0.04)]',
        'transition-shadow duration-200',
        onClick ? 'cursor-pointer active:scale-[0.99] transition-transform tap-highlight-none' : '',
      ].join(' ')}
    >
      <div className="flex items-start gap-3">
        <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={appointment.providerAvatar}
            alt={appointment.providerName}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-text-primary text-sm leading-tight">
              {appointment.providerName}
            </h3>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className={[
                'w-2 h-2 rounded-full flex-shrink-0',
                STATUS_DOT[appointment.status] ?? 'bg-surface-border',
              ].join(' ')} />
              <StatusBadge status={appointment.status} />
            </div>
          </div>
          <p className="text-sm text-text-secondary mb-2">{appointment.serviceName}</p>
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span className="flex items-center gap-1 bg-blue-xlight text-blue font-medium px-2.5 py-1 rounded-full">
              <Calendar size={11} />
              <span dir="ltr">{formatDateIL(appointment.date)}</span>
            </span>
            <span className="flex items-center gap-1 bg-blue-xlight text-blue font-medium px-2.5 py-1 rounded-full">
              <Clock size={11} />
              <span dir="ltr">{appointment.time}</span>
            </span>
            <span dir="ltr" className="font-extrabold text-sm text-text-primary ms-auto">
              {formatPrice(appointment.priceILS)}
            </span>
          </div>
          {appointment.staffName && (
            <p className="text-xs text-text-muted mt-1">אצל {appointment.staffName}</p>
          )}
        </div>
      </div>
      {isUpcoming && onCancel && (
        <div className="mt-3 pt-3 border-t border-dashed border-surface-border/70">
          <button
            onClick={(e) => { e.stopPropagation(); onCancel(); }}
            className="text-sm font-medium text-status-cancelled hover:text-red-700 transition-colors tap-highlight-none"
          >
            ביטול תור
          </button>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Visual verify**

Run `npm run dev` and open `/appointments`. Confirm:
- Cards have soft blue shadow, no thick right/left border stripe
- Date + time appear as blue-tinted pills
- Price is bold and clearly readable
- Status dot (colored circle) appears next to badge

- [ ] **Step 3: Commit**

```bash
git add components/domain/AppointmentCard.tsx
git commit -m "polish: AppointmentCard — elevated shadow, blue pills, status dot"
```

---

## Task 2: ProviderCard — elevated shadow + upgraded list layout

**Files:**
- Modify: `components/domain/ProviderCard.tsx`

List variant has a `border-e-2 border-e-blue` left accent. Replace with card shadow. Upgrade the CTA button and "open now" badge.

- [ ] **Step 1: Apply changes**

Replace the entire file content:

```tsx
'use client'

import Image from 'next/image'
import { MapPin } from 'lucide-react'
import type { Provider } from '@/types'
import { CATEGORIES } from '@/lib/mock-data'
import { formatPrice } from '@/lib/format'
import StarRating from '@/components/ui/StarRating'

interface ProviderCardProps {
  provider: Provider
  onClick?: () => void
  onBook?: () => void
  layout?: 'grid' | 'list'
}

export default function ProviderCard({
  provider,
  onClick,
  onBook,
  layout = 'grid',
}: ProviderCardProps) {
  const category = CATEGORIES.find((c) => c.id === provider.category)

  if (layout === 'list') {
    return (
      <div
        onClick={onClick}
        className={[
          'bg-white rounded-xl flex gap-3 p-3.5 cursor-pointer',
          'shadow-[0_4px_20px_rgba(27,79,216,0.10),_0_1px_4px_rgba(0,0,0,0.03)]',
          'active:scale-[0.99] transition-all duration-150 tap-highlight-none',
        ].join(' ')}
      >
        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={provider.avatarUrl}
            alt={provider.businessName}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-blue font-semibold mb-0.5">{category?.label}</p>
          <h3 className="font-bold text-text-primary text-sm leading-tight mb-1">
            {provider.businessName}
          </h3>
          <StarRating rating={provider.rating} reviewCount={provider.reviewCount} size={12} />
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <div className="flex items-center gap-1 min-w-0">
              <MapPin size={11} className="text-text-muted flex-shrink-0" />
              <p className="text-xs text-text-muted truncate">{provider.location}</p>
            </div>
            {provider.isOpenNow && (
              <span className="flex items-center gap-1 text-xs font-semibold text-status-confirmed border border-green-200 bg-green-50 px-2 py-0.5 rounded-full flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-status-confirmed inline-block" />
                פתוח עכשיו
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end justify-between flex-shrink-0">
          <span className="text-sm font-bold text-text-primary" dir="ltr">
            מ-{formatPrice(provider.priceFrom)}
          </span>
          {onBook && (
            <button
              onClick={(e) => { e.stopPropagation(); onBook(); }}
              className={[
                'text-xs font-semibold text-white px-3 py-1.5 rounded-full tap-highlight-none',
                'bg-gradient-to-br from-blue to-blue-accent',
                'shadow-[0_2px_8px_rgba(27,79,216,0.25)]',
                'hover:shadow-[0_3px_12px_rgba(27,79,216,0.35)] transition-all duration-150',
              ].join(' ')}
            >
              הזמן תור
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      className={[
        'bg-white rounded-xl overflow-hidden cursor-pointer',
        'shadow-[0_4px_20px_rgba(27,79,216,0.10),_0_1px_4px_rgba(0,0,0,0.03)]',
        'active:scale-[0.99] transition-all duration-150 tap-highlight-none',
      ].join(' ')}
    >
      <div className="relative h-44 w-full">
        <Image
          src={provider.coverUrl}
          alt={provider.businessName}
          fill
          className="object-cover"
          sizes="(max-width: 430px) 50vw, 215px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 p-3">
          <p className="text-xs text-white/75 font-medium mb-0.5">{category?.label}</p>
          <h3 className="font-bold text-white text-sm leading-tight">{provider.businessName}</h3>
        </div>
      </div>
      <div className="p-3 pt-2.5">
        <StarRating rating={provider.rating} reviewCount={provider.reviewCount} size={12} />
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-bold text-text-primary" dir="ltr">
            מ-{formatPrice(provider.priceFrom)}
          </span>
          {onBook && (
            <button
              onClick={(e) => { e.stopPropagation(); onBook(); }}
              className={[
                'text-xs font-semibold text-white px-3 py-1.5 rounded-full tap-highlight-none',
                'bg-gradient-to-br from-blue to-blue-accent',
                'shadow-[0_2px_8px_rgba(27,79,216,0.25)]',
                'hover:shadow-[0_3px_12px_rgba(27,79,216,0.35)] transition-all duration-150',
              ].join(' ')}
            >
              הזמן תור
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Visual verify**

Open `/providers`. Confirm:
- Provider list cards have soft shadow, no blue left border
- "פתוח עכשיו" badge has green dot + green border outline
- Book button has gradient + blue glow shadow
- Grid cards on home page retain cover image layout

- [ ] **Step 3: Commit**

```bash
git add components/domain/ProviderCard.tsx
git commit -m "polish: ProviderCard — elevated shadow, gradient CTA, open-now badge"
```

---

## Task 3: ServiceCard — selected state glow

**Files:**
- Modify: `components/domain/ServiceCard.tsx`

Minor upgrade: stronger selected ring, heavier price text.

- [ ] **Step 1: Apply changes**

Replace the class logic block:

```tsx
// Change this block (lines 22-27):
<div
  className={[
    'bg-white rounded-lg border transition-all duration-150',
    selected
      ? 'border-blue ring-2 ring-blue/20 shadow-[0_4px_20px_rgba(27,79,216,0.14),_0_1px_4px_rgba(0,0,0,0.05)]'
      : 'border-surface-border shadow-[0_4px_20px_rgba(27,79,216,0.10),_0_1px_4px_rgba(0,0,0,0.03)]',
  ].join(' ')}
>
```

Also update the price span (line 48) to use `font-bold`:
```tsx
<span className="font-bold text-text-primary" dir="ltr">
  {formatPrice(service.priceILS)}
</span>
```

- [ ] **Step 2: Visual verify**

Open `/book/service`. Tap a service. Confirm selected state has a blue ring glow and elevated shadow.

- [ ] **Step 3: Commit**

```bash
git add components/domain/ServiceCard.tsx
git commit -m "polish: ServiceCard — selected glow shadow, bolder price"
```

---

## Task 4: TimeSlotGrid — selected shadow + hover feedback

**Files:**
- Modify: `components/domain/TimeSlotGrid.tsx`

Selected slot should feel like a pressed button. Add shadow to selected state; strengthen hover feedback.

- [ ] **Step 1: Apply changes**

Replace entire file:

```tsx
'use client'

import type { TimeSlot } from '@/types'

interface TimeSlotGridProps {
  slots: TimeSlot[]
  selectedTime?: string
  onSelectTime: (time: string) => void
}

export default function TimeSlotGrid({ slots, selectedTime, onSelectTime }: TimeSlotGridProps) {
  if (slots.length === 0) {
    return (
      <p className="text-sm text-text-muted text-center py-6">
        אין שעות פנויות ביום זה
      </p>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {slots.map((slot) => {
        const isSelected = slot.time === selectedTime
        return (
          <button
            key={slot.time}
            onClick={() => slot.available && onSelectTime(slot.time)}
            disabled={!slot.available}
            className={[
              'py-2.5 rounded-xl text-sm font-medium transition-all duration-150 tap-highlight-none',
              slot.available
                ? isSelected
                  ? 'bg-blue text-white shadow-[0_2px_8px_rgba(27,79,216,0.30)] scale-[0.98]'
                  : 'bg-white border border-surface-border text-text-primary hover:border-blue hover:bg-blue-xlight hover:text-blue'
                : 'bg-surface-border/30 text-text-muted cursor-not-allowed line-through',
            ].join(' ')}
            dir="ltr"
          >
            {slot.time}
          </button>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Visual verify**

Open `/book/datetime`. Select a time slot. Confirm selected slot has blue shadow and subtle scale. Hover shows blue-tinted bg.

- [ ] **Step 3: Commit**

```bash
git add components/domain/TimeSlotGrid.tsx
git commit -m "polish: TimeSlotGrid — selected shadow, hover blue tint"
```

---

## Task 5: SortFilterSheet — polish active option + handle

**Files:**
- Modify: `components/domain/SortFilterSheet.tsx`

Minor: add shadow to active option; make drag handle more prominent.

- [ ] **Step 1: Apply changes**

In `SortFilterSheet.tsx`, update the button className (the active branch):

```tsx
// Change the active class from:
active
  ? 'bg-blue-xlight border border-blue/20'
  : 'bg-surface border border-transparent hover:bg-blue-xlight',

// To:
active
  ? 'bg-blue-xlight border border-blue/20 shadow-sm'
  : 'bg-surface border border-transparent hover:bg-blue-xlight',
```

- [ ] **Step 2: Visual verify**

Open `/providers`, tap the sort FAB. Confirm selected sort option has a subtle shadow lift.

- [ ] **Step 3: Commit**

```bash
git add components/domain/SortFilterSheet.tsx
git commit -m "polish: SortFilterSheet — active option shadow"
```

---

## Task 6: ReviewCard — gradient avatar background

**Files:**
- Modify: `components/domain/ReviewCard.tsx`

Upgrade the author avatar from flat `bg-blue-light` to a gradient.

- [ ] **Step 1: Apply changes**

Replace entire file:

```tsx
import type { Review } from '@/types'
import StarRating from '@/components/ui/StarRating'
import { formatDateLong } from '@/lib/date-utils'

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="border-b border-surface-border last:border-0 pb-4 last:pb-0">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-light to-blue-xlight flex items-center justify-center text-blue font-bold text-sm flex-shrink-0 shadow-sm">
            {review.authorName.charAt(0)}
          </div>
          <span className="font-semibold text-text-primary text-sm">{review.authorName}</span>
        </div>
        <span className="text-xs text-text-muted">{formatDateLong(review.date)}</span>
      </div>
      <StarRating rating={review.rating} size={13} showNumber={false} />
      <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">{review.text}</p>
    </div>
  )
}
```

- [ ] **Step 2: Visual verify**

Open `/providers/gentleman-barber`. Scroll to reviews. Confirm avatars show gradient background.

- [ ] **Step 3: Commit**

```bash
git add components/domain/ReviewCard.tsx
git commit -m "polish: ReviewCard — gradient avatar, bolder author name"
```

---

## Task 7: StaffCard — elevated shadow + gradient avatar

**Files:**
- Modify: `components/domain/StaffCard.tsx`

Replace flat border with card shadow. Upgrade avatar background.

- [ ] **Step 1: Apply changes**

Replace entire file:

```tsx
'use client'

import Image from 'next/image'
import { Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import type { StaffMember } from '@/types'
import StatusBadge from '@/components/ui/StatusBadge'

interface StaffCardProps {
  staff: StaffMember
  onEdit?: () => void
  onToggle?: () => void
  onRemove?: () => void
}

export default function StaffCard({ staff, onEdit, onToggle, onRemove }: StaffCardProps) {
  const isActive = staff.status === 'active'
  const isRemoved = staff.status === 'removed'

  return (
    <div className={[
      'bg-white rounded-xl p-4',
      'shadow-[0_4px_20px_rgba(27,79,216,0.10),_0_1px_4px_rgba(0,0,0,0.03)]',
      isRemoved ? 'opacity-60' : '',
    ].join(' ')}>
      <div className="flex items-center gap-3">
        <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-light to-blue-xlight">
          {staff.avatarUrl ? (
            <Image
              src={staff.avatarUrl}
              alt={staff.name}
              fill
              className="object-cover"
              sizes="44px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-blue font-bold text-base">
              {staff.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-semibold text-text-primary text-sm">{staff.name}</span>
            <StatusBadge status={staff.status} size="sm" />
          </div>
          <p className="text-xs text-blue font-medium">{staff.role}</p>
          <p className="text-xs text-text-muted mt-0.5" dir="ltr">{staff.phone}</p>
        </div>
        {!isRemoved && (
          <div className="flex items-center gap-1 flex-shrink-0">
            {onEdit && (
              <button
                onClick={onEdit}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface transition-colors tap-highlight-none text-text-muted hover:text-blue"
                aria-label="עריכה"
              >
                <Edit2 size={15} />
              </button>
            )}
            {onToggle && !isRemoved && (
              <button
                onClick={onToggle}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface transition-colors tap-highlight-none text-text-muted hover:text-blue"
                aria-label={isActive ? 'השבת' : 'הפעל'}
              >
                {isActive ? <ToggleRight size={16} className="text-status-active" /> : <ToggleLeft size={16} />}
              </button>
            )}
            {onRemove && !staff.hasBookingHistory && (
              <button
                onClick={onRemove}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors tap-highlight-none text-text-muted hover:text-status-cancelled"
                aria-label="הסר"
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Visual verify**

Open `/owner/staff`. Confirm cards have soft shadow, no border, avatar has rounded-xl shape, role label is blue.

- [ ] **Step 3: Commit**

```bash
git add components/domain/StaffCard.tsx
git commit -m "polish: StaffCard — elevated shadow, gradient avatar, blue role label"
```

---

## Task 8: BottomNav — pill highlight for active item

**Files:**
- Modify: `components/layout/BottomNav.tsx`

Replace the current active indicator (blue color + tiny bottom dot) with a pill that wraps the icon and label.

- [ ] **Step 1: Apply changes**

Replace entire file:

```tsx
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
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-app glass-nav shadow-nav z-40"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center h-[72px]">
        {tabs.map((tab) => {
          const active = isActive(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex-1 flex items-center justify-center tap-highlight-none py-2"
            >
              <span className={[
                'flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all duration-200',
                active
                  ? 'bg-blue-xlight text-blue'
                  : 'text-text-muted opacity-70 hover:opacity-100 hover:text-text-secondary',
              ].join(' ')}>
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
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Visual verify**

Open the app on any page. Confirm:
- Active tab has a blue-tinted pill wrapping icon + label
- No bottom dot indicator (removed)
- Inactive tabs are muted grey
- Notification badge still shows on התראות tab

- [ ] **Step 3: Commit**

```bash
git add components/layout/BottomNav.tsx
git commit -m "polish: BottomNav — pill highlight for active tab"
```

---

## Task 9: PageHeader — centered title + larger text

**Files:**
- Modify: `components/layout/PageHeader.tsx`

Restructure to 3-column layout so the title is always centered, matching a premium app pattern.

- [ ] **Step 1: Apply changes**

Replace entire file:

```tsx
'use client'

import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PageHeaderProps {
  title: string
  showBack?: boolean
  onBack?: () => void
  action?: { label: string; onClick: () => void }
  transparent?: boolean
  className?: string
}

export default function PageHeader({
  title,
  showBack = true,
  onBack,
  action,
  transparent = false,
  className = '',
}: PageHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  return (
    <header
      className={[
        'flex items-center justify-between px-4 py-3.5 sticky top-0 z-30',
        transparent ? 'bg-transparent' : 'bg-white border-b border-surface-border',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Start slot — back button */}
      <div className="w-9 flex-shrink-0">
        {showBack && (
          <button
            onClick={handleBack}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-surface border border-surface-border shadow-sm hover:bg-blue-xlight hover:border-blue/30 transition-all tap-highlight-none"
            aria-label="חזרה"
          >
            <ChevronRight size={22} className="text-blue" />
          </button>
        )}
      </div>

      {/* Center — title */}
      <h1 className="flex-1 text-center text-xl font-extrabold text-text-primary px-2 truncate">
        {title}
      </h1>

      {/* End slot — optional action */}
      <div className="w-9 flex-shrink-0 flex justify-end">
        {action && (
          <button
            onClick={action.onClick}
            className="text-sm font-semibold text-blue hover:text-blue-dark transition-colors tap-highlight-none whitespace-nowrap"
          >
            {action.label}
          </button>
        )}
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Visual verify**

Open `/appointments`. Confirm title "התורים שלי" is centered, larger, and the back button (when present) is to the start side. Check `/notifications`, `/profile`, `/owner/settings` — all should have centered titles.

- [ ] **Step 3: Commit**

```bash
git add components/layout/PageHeader.tsx
git commit -m "polish: PageHeader — centered title, text-xl, clean 3-col layout"
```

---

## Task 10: Booking confirm + success — elevated summary cards

**Files:**
- Modify: `app/book/confirm/page.tsx`
- Modify: `app/booking-success/page.tsx`

Upgrade both summary cards to use elevated shadow instead of border.

- [ ] **Step 1: Update confirm page summary card**

In `app/book/confirm/page.tsx`, change the summary card wrapper (line 43):

```tsx
// Change from:
<div className="bg-white rounded-xl border border-surface-border shadow-card overflow-hidden">

// Change to:
<div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(27,79,216,0.10),_0_1px_4px_rgba(0,0,0,0.03)]">
```

Also update the provider avatar (line 46) from `rounded-lg` to `rounded-xl`:
```tsx
<div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
```

And the service price (line 68) — make it more prominent:
```tsx
<span className="text-xl font-extrabold text-blue" dir="ltr">
  {formatPrice(service.priceILS)}
</span>
```

- [ ] **Step 2: Update success page**

In `app/booking-success/page.tsx`:

Change the success icon container (line 32):
```tsx
// Change from:
<div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-5">

// Change to:
<div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center mb-5 shadow-[0_4px_16px_rgba(22,163,74,0.15)]">
```

Change the title (line 36) to be bolder:
```tsx
<h1 className="text-2xl font-extrabold text-text-primary mb-2">התור אושר!</h1>
```

Change the summary card (line 42):
```tsx
// Change from:
<div className="w-full bg-surface rounded-xl border border-surface-border p-4 mb-8 space-y-3 text-start">

// Change to:
<div className="w-full bg-white rounded-xl p-4 mb-8 space-y-3 text-start shadow-[0_4px_20px_rgba(27,79,216,0.10),_0_1px_4px_rgba(0,0,0,0.03)]">
```

- [ ] **Step 3: Visual verify**

Complete a booking flow: `/` → pick a provider → `/book/service` → `/book/datetime` → `/book/confirm` → `/booking-success`. Confirm:
- Confirm page summary card has soft shadow, no border, price is xl + extrabold
- Success page icon has green glow shadow
- Success summary card is white + elevated

- [ ] **Step 4: Commit**

```bash
git add app/book/confirm/page.tsx app/booking-success/page.tsx
git commit -m "polish: booking confirm + success — elevated cards, gradient success icon"
```

---

## Task 11: Owner dashboard — elevated today rows + stats shadow

**Files:**
- Modify: `app/owner/page.tsx`

Stats cards already have gradient backgrounds — add shadow. Today's appointment rows get card shadow.

- [ ] **Step 1: Update stats grid cards**

In `app/owner/page.tsx`, for each of the 3 stats cards (lines 48, 53, 60), add a shadow:

```tsx
// First stats card (line 48) — add shadow class:
<div className="bg-gradient-to-br from-blue-xlight to-blue-light rounded-xl p-4 text-center border border-blue/10 shadow-[0_4px_20px_rgba(27,79,216,0.12)]">

// Second stats card (line 53) — add shadow class:
<div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-4 text-center border border-green-100 shadow-[0_4px_16px_rgba(22,163,74,0.10)]">

// Third stats card (line 60) — add shadow class:
<div className="bg-gradient-to-br from-slate-50 to-surface rounded-xl p-4 text-center border border-surface-border shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
```

- [ ] **Step 2: Update today's appointment rows**

For the appointment row div (line 103):
```tsx
// Change from:
<div
  key={apt.id}
  className="bg-white rounded-xl border border-surface-border shadow-card p-3.5 flex items-center gap-3"
>

// Change to:
<div
  key={apt.id}
  className="bg-white rounded-xl p-3.5 flex items-center gap-3 shadow-[0_4px_20px_rgba(27,79,216,0.10),_0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_24px_rgba(27,79,216,0.14)] transition-shadow duration-150"
>
```

- [ ] **Step 3: Visual verify**

Open `/owner`. Confirm stats cards are visually lifted. Today's rows look like premium cards.

- [ ] **Step 4: Commit**

```bash
git add app/owner/page.tsx
git commit -m "polish: owner dashboard — stats card shadows, elevated today rows"
```

---

## Task 12: Home recent providers card + owner settings CTA

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/owner/settings/page.tsx`

Polish the inline recent-provider cards on the home screen and the save button in settings.

- [ ] **Step 1: Update home recent provider cards**

In `app/page.tsx`, the recent provider cards (line 135):

```tsx
// Change from:
<div
  key={p.id}
  className="flex-shrink-0 bg-white rounded-xl border border-surface-border shadow-card p-3 flex items-center gap-3 min-w-[200px]"
>

// Change to:
<div
  key={p.id}
  className="flex-shrink-0 bg-white rounded-xl p-3 flex items-center gap-3 min-w-[200px] shadow-[0_4px_20px_rgba(27,79,216,0.10),_0_1px_4px_rgba(0,0,0,0.03)]"
>
```

Also upgrade the "הזמן שוב" button in the same section (line 150):
```tsx
// Change from:
className="flex-shrink-0 text-xs font-semibold text-blue bg-blue-xlight border border-blue/20 px-2.5 py-1 rounded-full tap-highlight-none hover:bg-blue-light transition-colors"

// Change to:
className="flex-shrink-0 text-xs font-semibold text-white bg-gradient-to-br from-blue to-blue-accent px-2.5 py-1 rounded-full tap-highlight-none shadow-[0_2px_6px_rgba(27,79,216,0.25)] hover:shadow-[0_3px_10px_rgba(27,79,216,0.35)] transition-all duration-150"
```

- [ ] **Step 2: Update owner settings save button**

`components/ui/Button.tsx` primary variant already uses `bg-gradient-to-b from-blue-accent to-blue shadow-sm shadow-blue/25` — no change needed. The `<Button variant="primary">` in `/owner/settings` will automatically look polished once the rest of the page spacing is consistent. No code change required for this step.

- [ ] **Step 3: Visual verify**

Open `/` — if you have previous appointments, confirm recent provider cards have elevated shadow and the "הזמן שוב" button is now gradient with glow. Open `/owner/settings` — confirm Save button feels premium.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/owner/settings/page.tsx
git commit -m "polish: home recent cards elevated, owner settings CTA gradient"
```

---

## Task 13: Provider detail — rounded content overlap + book button shadow

**Files:**
- Modify: `app/providers/[id]/page.tsx`

The business header sits directly under the cover image with a flat top edge. Adding `rounded-t-3xl` creates a premium "content sliding up from behind cover" effect. Also add a shadow to the sticky book button.

- [ ] **Step 1: Add rounded overlap to business header**

In `app/providers/[id]/page.tsx`, find the business header div (around line 77):

```tsx
// Change from:
<div className="px-4 py-4 bg-white border-b border-surface-border">

// Change to:
<div className="px-4 pt-5 pb-4 bg-white border-b border-surface-border rounded-t-3xl -mt-5 relative z-10">
```

- [ ] **Step 2: Add shadow to sticky book button**

Find the sticky bottom button container near the end of `ProviderProfileContent`. It will look like a `fixed` or `sticky` div wrapping a `<Button variant="primary">`. Add a shadow to the container:

```tsx
// If the container has classes like 'fixed bottom-0 ... bg-white border-t ...' change border-t to:
className="fixed bottom-0 ... bg-white shadow-[0_-4px_20px_rgba(27,79,216,0.08)] ..."
// (replace border-t border-surface-border with the shadow — or keep border-t and add shadow)
```

Read lines 80–end of `app/providers/[id]/page.tsx` to find the exact sticky CTA container before editing.

- [ ] **Step 3: Visual verify**

Open `/providers/gentleman-barber`. Confirm the white content section has rounded top corners that overlap the cover photo. The book button at the bottom has a soft upward shadow.

- [ ] **Step 4: Commit**

```bash
git add "app/providers/[id]/page.tsx"
git commit -m "polish: provider detail — rounded-t-3xl content overlap, book button shadow"
```

---

## Verification Checklist

After all tasks:

- [ ] Run `npm run dev` and open at 390px viewport width
- [ ] Navigate: Home → Provider Detail → Book → Confirm → Success (full booking flow)
- [ ] Open `/appointments` — cards have shadow, blue pills, status dots
- [ ] Open `/providers` — list cards have shadow, gradient book button, open-now badge
- [ ] Open `/notifications` — nav pill highlights correct tab
- [ ] Open `/owner` — stats elevated, appointment rows are cards
- [ ] Open `/owner/staff` — cards have shadow, avatar rounded-xl
- [ ] Check RTL: all icons are on the correct side, no LTR overflow
- [ ] Check all 4 status badge types: confirmed (green), pending (yellow), cancelled (red), completed (grey)
- [ ] Confirm no TypeScript/build errors: `npm run build`
