# Visual Polish Design Spec — TOR5
**Date:** 2026-06-10  
**Status:** Approved for implementation

---

## Context

TOR5 is a Hebrew RTL appointment-booking app (Next.js 14 + Tailwind) with a solid foundation but a "template-like" feel. The goal is a full visual polish pass that makes every screen feel like a professional Israeli market product — premium, clean, and consistent — without changing any business logic, routing, or the existing color palette (white, blue, light blue).

Three visual decisions were made during brainstorming:
- **Cards:** Elevated shadow (no border) — premium depth without heaviness
- **Bottom nav:** Pill highlight on active item — clean and recognizable
- **Inner page headers:** Clean white — home screen carries the hero identity

---

## Approach: Component-First

Polish shared primitives first so every screen inherits the improvements automatically. Screen-specific cleanup follows.

**Order:**
1. Shared domain components (`components/domain/`)
2. Bottom navigation (embedded in page layouts)
3. Inner page headers (embedded in page layouts)
4. Screen-specific spacing and section rhythm
5. Booking flow and success screens

---

## Design System Tokens (no new values — reuse existing)

| Token | Usage |
|---|---|
| `shadow-[0_4px_20px_rgba(27,79,216,0.10),_0_1px_4px_rgba(0,0,0,0.03)]` | All elevated cards (replace `border + shadow-card`) |
| `shadow-[0_2px_8px_rgba(27,79,216,0.25)]` | CTA buttons |
| `bg-gradient-to-br from-blue to-blue-accent` | Primary CTA buttons (gradient) |
| `bg-blue-xlight text-blue` | Active pill highlight (nav, status badges, info pills) |
| `font-extrabold` / `font-black` | Price figures and hero numbers |
| `transition-all duration-200` | All interactive elements |

---

## Component Changes

### `components/domain/AppointmentCard.tsx`
- Remove `border border-surface-border border-e-[5px] border-e-{status}` — replace with elevated card shadow
- Preserve status color signal: add a small filled dot (`w-2 h-2 rounded-full`) in the status-matching color next to the badge instead of the full-height left border stripe
- Upgrade date/time pills: `bg-blue-xlight text-blue font-medium` with emoji icon, no border
- Status badge: slightly larger padding (`px-3 py-1`), `font-semibold`, keep existing status colors
- Price: `text-base font-extrabold`
- Add `hover:shadow-lg transition-all duration-200` for interactive feel

### `components/domain/ProviderCard.tsx`
**List variant:**
- Remove `border-e-2 border-e-blue` left accent, replace with card shadow
- Avatar: add `bg-gradient-to-br from-blue-light to-blue-xlight` background + subtle shadow instead of flat grey
- Avatar shape: upgrade to `rounded-xl` (square rounded) instead of circle — more modern for business logos
- "Open now" badge: add green dot `●` prefix + `border border-green-200` outline — more premium than flat chip
- CTA button: gradient + blue shadow
- Category label: `text-blue font-medium` instead of muted grey

**Grid variant:**
- Cover image overlay: keep `bg-gradient-to-t from-black/60` but extend to `via-black/10 to-transparent`
- Rating badge: upgrade with star icon color to yellow-400, white bg, subtle shadow

### `components/domain/ServiceCard.tsx`
- Selected state: `border-blue ring-2 ring-blue/20` → keep ring but add `shadow-[0_0_0_4px_rgba(27,79,216,0.08)]` outer glow
- Service name: `font-semibold text-text-primary`
- Duration/price row: price `font-bold text-text-primary`, duration `text-text-muted text-sm`
- Selected checkmark: upgrade to filled blue circle with white check

### `components/domain/TimeSlotGrid.tsx`
- Available slots: `bg-white border border-surface-border` → add `hover:border-blue hover:bg-blue-xlight transition-colors duration-150`
- Selected slot: `bg-blue text-white` + `shadow-[0_2px_8px_rgba(27,79,216,0.30)]`
- Slot text: `text-sm font-medium`

### `components/domain/SortFilterSheet.tsx`
- Sheet container: `rounded-t-2xl shadow-modal` — upgrade to `rounded-t-3xl`
- Option items: selected state `bg-blue-xlight border border-blue/20` → add `shadow-sm`
- Handle bar: make more prominent `w-10 h-1 bg-surface-border rounded-full`

### `components/domain/ReviewCard.tsx`
- Author avatar: upgrade from initials-only circle to `bg-gradient-to-br from-blue-light to-blue-xlight`
- Star row: use filled yellow stars (`text-yellow-400`) with a count label
- Review text: `text-sm leading-relaxed text-text-secondary`
- Date: right-aligned, `text-xs text-text-muted`

### `components/domain/StaffCard.tsx`
- Card: replace border with card shadow (same pattern as AppointmentCard)
- Avatar: upgrade to `rounded-xl` with gradient background
- Role label: `text-blue text-xs font-medium`
- Status badge: larger padding, `font-semibold`

---

## Bottom Navigation

Present in all customer-facing page layouts. Target the existing `glass-nav` container.

**Changes:**
- Active item: wrap label + icon in `bg-blue-xlight text-blue rounded-2xl px-3 py-1.5` pill
- Inactive items: `text-text-muted` with `hover:text-text-secondary transition-colors`
- Add `transition-all duration-200` to nav items
- Keep `glass-nav` backdrop blur — it already works well
- Ensure `font-medium` on active label, `font-normal` on inactive

---

## Inner Page Headers

All inner screens (appointments, notifications, profile, providers, owner screens) use the white header pattern.

**Pattern:**
```
bg-white border-b border-surface-border sticky top-0 z-10
  px-4 py-4 flex items-center justify-between
    back button: w-9 h-9 rounded-full bg-surface flex items-center justify-center text-text-secondary
    title: text-xl font-extrabold text-text-primary text-center
    right slot: w-9 (empty or action icon)
```

**Where to apply:** All pages that currently have a manual header pattern — consistent across all 14 files.

---

## Screen-Specific Polish

### Home (`app/page.tsx`)
- Section headers: add consistent pattern — `text-xs font-bold uppercase tracking-widest text-text-muted` label on the left + `text-sm font-semibold text-blue` "ראה הכל" link on the right
- Recent providers horizontal scroll: upgrade cards to use the new ProviderCard elevation
- Categories pills: add `transition-all duration-150 active:scale-95` tap feedback
- Hero greeting text: `text-2xl font-black` for name, `text-blue-light/90` for subtitle

### Provider Detail (`app/providers/[id]/page.tsx`)
- Info section below cover: add `bg-white rounded-t-3xl -mt-4 relative z-10 pt-5 px-4` overlap for a cleaner cover-to-content transition
- Services section header: apply consistent section header pattern
- "Book" sticky button: add `shadow-[0_2px_8px_rgba(27,79,216,0.30)]` to the CTA

### Booking Confirm (`app/book/confirm/page.tsx`)
- Summary card: elevated shadow, no border
- Each summary row: add `py-3 border-b border-surface-border last:border-0` for clean dividers
- Provider avatar: upgrade to `rounded-xl` with gradient background

### Booking Success (`app/booking-success/page.tsx`)
- Success icon: upgrade `bg-green-50` circle to `bg-gradient-to-br from-green-50 to-emerald-50` with `shadow-[0_4px_16px_rgba(22,163,74,0.15)]`
- CTA buttons: primary gets gradient + shadow, secondary gets `border-blue/30`
- Summary grid: upgrade to card with shadow, consistent dividers

### Owner Dashboard (`app/owner/page.tsx`)
- Stats cards: already have gradient bg — add `shadow-[0_4px_20px_rgba(27,79,216,0.12)]` for lift
- Today's appointment rows: add `hover:bg-surface transition-colors duration-150`
- Quick action buttons: full-width gradient button for primary, outline for secondary

### Owner Settings (`app/owner/settings/page.tsx`)
- Input fields: consistent `rounded-xl border-surface-border focus:border-blue focus:ring-2 focus:ring-blue/10` styling
- Section headers: consistent uppercase label pattern
- Save button: gradient CTA with shadow

---

## What Does NOT Change
- All routing and navigation logic
- Color palette values (no new colors added)
- Business logic, mock data, state management
- RTL layout (`dir="rtl"`, logical properties)
- Font (Heebo stays)
- Max-width, safe-area padding, bottom-nav height tokens

---

## Verification

After implementation:
1. Open each of the 5 customer routes on mobile viewport (390px) and confirm visual hierarchy feels clear and premium
2. Navigate through the full booking flow (home → provider → service → datetime → confirm → success) and confirm consistent card/button treatment
3. Check owner dashboard, staff, and settings pages for consistent header/card pattern
4. Confirm RTL: no broken flex layouts, no LTR icon/text combinations
5. Check all status badges (confirmed/pending/cancelled/completed) still use correct colors
