// ─── Categories ──────────────────────────────────────────────────────────────

export type CategoryId =
  | 'barber'
  | 'nails'
  | 'hair'
  | 'cosmetics'
  | 'massage'
  | 'fitness'

export interface Category {
  id: CategoryId
  label: string
  icon: string
  color: string
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface ContactInfo {
  phone?: string
  whatsapp?: string
  waze?: string
  instagram?: string
  facebook?: string
  address?: string
}

// ─── Review ──────────────────────────────────────────────────────────────────

export interface Review {
  id: string
  authorName: string
  authorAvatar?: string
  rating: number
  text: string
  date: string
}

// ─── Service ─────────────────────────────────────────────────────────────────

export interface Service {
  id: string
  providerId: string
  name: string
  description?: string
  durationMins: number
  priceILS: number
}

// ─── Provider ────────────────────────────────────────────────────────────────

export interface Provider {
  id: string
  name: string
  businessName: string
  category: CategoryId
  tagline: string
  about: string
  avatarUrl: string
  coverUrl: string
  gallery: string[]
  rating: number
  reviewCount: number
  priceFrom: number
  services: Service[]
  reviews: Review[]
  contact: ContactInfo
  location: string
  isActive: boolean
  isOpenNow?: boolean
}

// ─── Appointment ─────────────────────────────────────────────────────────────

export type AppointmentStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed'

export interface Appointment {
  id: string
  providerId: string
  providerName: string
  providerAvatar: string
  serviceId: string
  serviceName: string
  durationMins: number
  priceILS: number
  date: string
  time: string
  status: AppointmentStatus
  createdAt: string
  staffName?: string
  staffId?: string
}

// ─── Booking Flow ────────────────────────────────────────────────────────────

export interface BookingDraft {
  step: 1 | 2 | 3 | 4
  providerId?: string
  serviceId?: string
  date?: string
  time?: string
}

// ─── Staff ───────────────────────────────────────────────────────────────────

export type StaffStatus = 'active' | 'inactive' | 'removed'

export interface StaffMember {
  id: string
  name: string
  role: string
  phone: string
  avatarUrl?: string
  status: StaffStatus
  joinedDate: string
  hasBookingHistory: boolean
}

// ─── Business Settings ───────────────────────────────────────────────────────

export interface DaySchedule {
  open: string
  close: string
}

export type WorkingHours = {
  [dayIndex: number]: DaySchedule | null
}

export interface BusinessSettings {
  id: string
  name: string
  category: CategoryId
  about: string
  imageUrl: string
  contact: ContactInfo
  workingHours: WorkingHours
}

// ─── Time Slot ───────────────────────────────────────────────────────────────

export interface TimeSlot {
  time: string
  available: boolean
}

// ─── Notification ────────────────────────────────────────────────────────────

export type NotificationType = 'reminder' | 'confirmation' | 'cancellation' | 'system'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  body: string
  date: string
  read: boolean
  appointmentId?: string
}

// ─── Owner Filter ────────────────────────────────────────────────────────────

export type OwnerFilter =
  | { type: 'all' }
  | { type: 'me' }
  | { type: 'staff'; staffId: string }
  | { type: 'service'; serviceId: string }

// ─── Customer Profile ────────────────────────────────────────────────────────

export interface CustomerProfile {
  id: string
  name: string
  phone: string
  avatarUrl?: string
}
