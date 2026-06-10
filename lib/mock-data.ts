import type {
  Category,
  Provider,
  Service,
  Review,
  StaffMember,
  Appointment,
  Notification,
  BusinessSettings,
  TimeSlot,
  CustomerProfile,
} from '@/types'

// ─── Categories ──────────────────────────────────────────────────────────────

export const CATEGORIES: Category[] = [
  { id: 'barber', label: 'ספר', icon: '✂️', color: '#2563EB' },
  { id: 'nails', label: 'ציפורניים', icon: '💅', color: '#EC4899' },
  { id: 'hair', label: 'שיער', icon: '💇', color: '#8B5CF6' },
  { id: 'cosmetics', label: 'קוסמטיקה', icon: '✨', color: '#06B6D4' },
  { id: 'massage', label: 'עיסוי', icon: '🧖', color: '#10B981' },
  { id: 'fitness', label: 'כושר', icon: '💪', color: '#F59E0B' },
]

// ─── Providers ───────────────────────────────────────────────────────────────

const gentlemanServices: Service[] = [
  { id: 'g1', providerId: 'gentleman-barber', name: 'תספורת גברים', durationMins: 30, priceILS: 60 },
  { id: 'g2', providerId: 'gentleman-barber', name: 'גילוח קלאסי', durationMins: 45, priceILS: 80 },
  { id: 'g3', providerId: 'gentleman-barber', name: 'עיצוב זקן', durationMins: 20, priceILS: 50 },
  { id: 'g4', providerId: 'gentleman-barber', name: 'תספורת + גילוח', durationMins: 60, priceILS: 130 },
  { id: 'g5', providerId: 'gentleman-barber', name: 'קאט ועיצוב', description: 'תספורת, גוון ועיצוב מלא', durationMins: 75, priceILS: 150 },
]

const nailServices: Service[] = [
  { id: 'n1', providerId: 'studio-nail', name: 'ג׳ל בסיסי', durationMins: 60, priceILS: 120 },
  { id: 'n2', providerId: 'studio-nail', name: 'ג׳ל + עיצוב', durationMins: 90, priceILS: 180 },
  { id: 'n3', providerId: 'studio-nail', name: 'הסרת ג׳ל', durationMins: 30, priceILS: 80 },
  { id: 'n4', providerId: 'studio-nail', name: 'פדיקור', durationMins: 60, priceILS: 160 },
  { id: 'n5', providerId: 'studio-nail', name: 'אקריל', durationMins: 90, priceILS: 220 },
]

const hairServices: Service[] = [
  { id: 'h1', providerId: 'salon-shir', name: 'תסרוקת בסיסית', durationMins: 45, priceILS: 80 },
  { id: 'h2', providerId: 'salon-shir', name: 'צביעה', durationMins: 120, priceILS: 250 },
  { id: 'h3', providerId: 'salon-shir', name: 'גוונים', durationMins: 150, priceILS: 350 },
  { id: 'h4', providerId: 'salon-shir', name: 'החלקה', durationMins: 180, priceILS: 450 },
  { id: 'h5', providerId: 'salon-shir', name: 'תסרוקת כלה', durationMins: 120, priceILS: 380 },
]

const cosmeticsServices: Service[] = [
  { id: 'c1', providerId: 'clinic-b', name: 'טיפול פנים בסיסי', durationMins: 60, priceILS: 200 },
  { id: 'c2', providerId: 'clinic-b', name: 'הסרת שיער בלייזר', durationMins: 45, priceILS: 350 },
  { id: 'c3', providerId: 'clinic-b', name: 'מיקרובליידינג', durationMins: 120, priceILS: 900 },
  { id: 'c4', providerId: 'clinic-b', name: 'מסכת פנים', durationMins: 45, priceILS: 180 },
  { id: 'c5', providerId: 'clinic-b', name: 'טיפול אנטי-אייג׳ינג', durationMins: 90, priceILS: 480 },
]

const gentlemanReviews: Review[] = [
  { id: 'gr1', authorName: 'יואב כהן', rating: 5, text: 'שירות מדהים, תספורת מושלמת. חוזר כל חודש!', date: '2026-05-20' },
  { id: 'gr2', authorName: 'רון לוי', rating: 5, text: 'הגילוח הכי טוב שהיה לי. מקצועי ונקי.', date: '2026-05-10' },
  { id: 'gr3', authorName: 'אמיר נסים', rating: 4, text: 'מקצועי ומהיר. המקום נקי ומסודר מאוד.', date: '2026-04-28' },
  { id: 'gr4', authorName: 'דוד שלום', rating: 5, text: 'ממליץ בחום! עיצוב הזקן יצא מושלם.', date: '2026-04-15' },
]

const nailReviews: Review[] = [
  { id: 'nr1', authorName: 'שירה גרוס', rating: 5, text: 'הציפורניים יצאו מדהימות! בדיוק מה שביקשתי.', date: '2026-05-25' },
  { id: 'nr2', authorName: 'נועה כהן', rating: 5, text: 'השירות הכי טוב בתל אביב. ממליצה לכולן!', date: '2026-05-18' },
  { id: 'nr3', authorName: 'מיכל אבן', rating: 5, text: 'עיצוב יצירתי ועמיד. כבר חודש ולא נסדק.', date: '2026-05-05' },
  { id: 'nr4', authorName: 'אורית בן', rating: 4, text: 'מקצועיות ונחמדות. קצת ארוך אבל שווה.', date: '2026-04-20' },
  { id: 'nr5', authorName: 'יעל דן', rating: 5, text: 'חוזרת שוב ושוב. פשוט הכי טוב!', date: '2026-04-01' },
]

const hairReviews: Review[] = [
  { id: 'hr1', authorName: 'לירון אלון', rating: 5, text: 'שיר הכי מקצועית! הגוונים יצאו חלומיים.', date: '2026-05-22' },
  { id: 'hr2', authorName: 'מאיה פרץ', rating: 4, text: 'קיבלתי בדיוק מה שרציתי. נקי ומזמין.', date: '2026-05-08' },
  { id: 'hr3', authorName: 'תמר כהן', rating: 5, text: 'התסרוקת לחתונה הייתה מושלמת. תודה!', date: '2026-04-18' },
]

const cosmeticsReviews: Review[] = [
  { id: 'cr1', authorName: 'ספיר גבאי', rating: 4, text: 'הטיפול מאוד נעים, העור שלי במצב נהדר אחרי.', date: '2026-05-15' },
  { id: 'cr2', authorName: 'רחל שמש', rating: 4, text: 'מיקרובליידינג מצוין, תוצאות טבעיות ויפות.', date: '2026-05-02' },
  { id: 'cr3', authorName: 'הדר לוי', rating: 5, text: 'מקצועית מאוד ונדיבה. ממליצה בחום.', date: '2026-04-10' },
]

export const PROVIDERS: Provider[] = [
  {
    id: 'gentleman-barber',
    name: 'ג׳נטלמן',
    businessName: 'ג׳נטלמן — ספר גברים',
    category: 'barber',
    tagline: 'תספורת גברים מקצועית בתל אביב',
    about: 'אנחנו מאמינים שכל גבר מגיע לטיפול הכי טוב. אצלנו תקבל תספורת מדויקת, גילוח קלאסי, ועיצוב זקן על ידי ספרים מנוסים. האווירה שלנו — נינוחה, מסודרת, ובלי המתנה מיותרת.',
    avatarUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop',
    coverUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&h=400&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&h=400&fit=crop',
    ],
    rating: 4.7,
    reviewCount: 84,
    priceFrom: 60,
    services: gentlemanServices,
    reviews: gentlemanReviews,
    contact: {
      phone: '03-123-4567',
      whatsapp: '972501234567',
      waze: 'https://waze.com/ul?ll=32.08,34.78&navigate=yes',
      instagram: 'gentleman_tlv',
    },
    location: 'רחוב דיזנגוף 85, תל אביב',
    isActive: true,
  },
  {
    id: 'studio-nail',
    name: 'סטודיו נייל',
    businessName: 'סטודיו נייל',
    category: 'nails',
    tagline: 'ציפורניים בעיצוב אישי — ג׳ל, אקריל ופדיקור',
    about: 'סטודיו נייל הוא המקום שבו ציפורניים הופכות ליצירת אמנות. אנחנו מתמחות בעיצובים מותאמים אישית, ג׳ל איכותי ואקריל עמיד. כל לקוחה מקבלת יחס אישי ותשומת לב לפרטים הקטנים.',
    avatarUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop',
    coverUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=400&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop&q=70',
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop&q=50',
    ],
    rating: 4.9,
    reviewCount: 137,
    priceFrom: 80,
    services: nailServices,
    reviews: nailReviews,
    contact: {
      phone: '054-987-6543',
      whatsapp: '972549876543',
      instagram: 'studio_nail_tlv',
      facebook: 'https://facebook.com/studionail',
    },
    location: 'שדרות רוטשילד 22, תל אביב',
    isActive: true,
  },
  {
    id: 'salon-shir',
    name: 'סלון שיר',
    businessName: 'סלון שיר',
    category: 'hair',
    tagline: 'סלון שיער בוטיק עם יחס אישי',
    about: 'סלון שיר הוא מקום שבו שיערך בידיים טובות. הצוות שלנו מתמחה בצבע, גוונים, החלקות ותסרוקות לאירועים. אנחנו משתמשים רק במוצרי פרימיום ומלאות שמחה לעזור לך להרגיש הכי יפה.',
    avatarUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop',
    coverUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=400&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=400&fit=crop',
    ],
    rating: 4.5,
    reviewCount: 56,
    priceFrom: 80,
    services: hairServices,
    reviews: hairReviews,
    contact: {
      phone: '052-321-6540',
      waze: 'https://waze.com/ul?ll=32.07,34.79&navigate=yes',
      facebook: 'https://facebook.com/salonshir',
    },
    location: 'רחוב בן יהודה 112, תל אביב',
    isActive: true,
  },
  {
    id: 'clinic-b',
    name: 'קליניק ב׳',
    businessName: 'קליניק ב׳',
    category: 'cosmetics',
    tagline: 'טיפולי עור ויופי מתקדמים',
    about: 'קליניק ב׳ מספק טיפולי קוסמטיקה מתקדמים בסביבה מקצועית ורגועה. אנחנו מתמחים בהסרת שיער בלייזר, מיקרובליידינג וטיפולי עור איכותיים. כל טיפול מותאם אישית לסוג העור ולצרכי הלקוח.',
    avatarUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&h=200&fit=crop',
    coverUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=400&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=400&fit=crop',
    ],
    rating: 4.2,
    reviewCount: 41,
    priceFrom: 180,
    services: cosmeticsServices,
    reviews: cosmeticsReviews,
    contact: {
      phone: '050-555-1234',
      whatsapp: '972505551234',
      instagram: 'clinicb_beauty',
    },
    location: 'שדרות הנשיא 8, הרצליה',
    isActive: true,
  },
]

// ─── Staff Members ────────────────────────────────────────────────────────────

export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'מיכאל ברק',
    role: 'ספר ראשי',
    phone: '054-100-1001',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    status: 'active',
    joinedDate: '2024-01-15',
    hasBookingHistory: true,
  },
  {
    id: 'staff-2',
    name: 'אריאל כהן',
    role: 'ספר',
    phone: '054-100-1002',
    avatarUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    status: 'active',
    joinedDate: '2024-06-01',
    hasBookingHistory: true,
  },
  {
    id: 'staff-3',
    name: 'גל שמיר',
    role: 'ספר',
    phone: '054-100-1003',
    avatarUrl: 'https://randomuser.me/api/portraits/men/57.jpg',
    status: 'inactive',
    joinedDate: '2023-09-01',
    hasBookingHistory: true,
  },
  {
    id: 'staff-4',
    name: 'נדב לוי',
    role: 'ספר סטאז׳',
    phone: '054-100-1004',
    status: 'removed',
    joinedDate: '2025-01-01',
    hasBookingHistory: false,
  },
]

// ─── Sample Appointments ──────────────────────────────────────────────────────

export const SAMPLE_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    providerId: 'gentleman-barber',
    providerName: 'ג׳נטלמן — ספר גברים',
    providerAvatar: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop',
    serviceId: 'g1',
    serviceName: 'תספורת גברים',
    durationMins: 30,
    priceILS: 60,
    date: '2026-06-12',
    time: '14:00',
    status: 'confirmed',
    createdAt: '2026-06-10T09:00:00Z',
    staffName: 'מיכאל ברק',
    staffId: 'staff-1',
  },
  {
    id: 'apt-2',
    providerId: 'studio-nail',
    providerName: 'סטודיו נייל',
    providerAvatar: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop',
    serviceId: 'n2',
    serviceName: 'ג׳ל + עיצוב',
    durationMins: 90,
    priceILS: 180,
    date: '2026-06-17',
    time: '11:00',
    status: 'pending',
    createdAt: '2026-06-09T15:00:00Z',
  },
  {
    id: 'apt-3',
    providerId: 'salon-shir',
    providerName: 'סלון שיר',
    providerAvatar: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop',
    serviceId: 'h2',
    serviceName: 'צביעה',
    durationMins: 120,
    priceILS: 250,
    date: '2026-06-03',
    time: '10:00',
    status: 'completed',
    createdAt: '2026-05-29T12:00:00Z',
    staffName: 'שיר',
  },
]

// ─── Sample Notifications ─────────────────────────────────────────────────────

export const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    type: 'reminder',
    title: 'תזכורת לתור מחר',
    body: 'מחר בשעה 14:00 — תספורת גברים אצל ג׳נטלמן. רחוב דיזנגוף 85.',
    date: '2026-06-11T09:00:00Z',
    read: false,
    appointmentId: 'apt-1',
  },
  {
    id: 'notif-2',
    type: 'confirmation',
    title: 'הזמנה אושרה',
    body: 'הזמנתך לג׳ל + עיצוב ב-17/06 בשעה 11:00 אושרה בהצלחה.',
    date: '2026-06-09T15:01:00Z',
    read: false,
    appointmentId: 'apt-2',
  },
  {
    id: 'notif-3',
    type: 'system',
    title: 'ברוכים הבאים ל-TOR5',
    body: 'שמחים שהצטרפת! הזמן את התור הראשון שלך תוך דקות ספורות.',
    date: '2026-06-01T08:00:00Z',
    read: true,
  },
]

// ─── Business Settings ────────────────────────────────────────────────────────

export const BUSINESS_SETTINGS: BusinessSettings = {
  id: 'gentleman-barber',
  name: 'ג׳נטלמן — ספר גברים',
  category: 'barber',
  about: 'אנחנו מאמינים שכל גבר מגיע לטיפול הכי טוב. אצלנו תקבל תספורת מדויקת, גילוח קלאסי, ועיצוב זקן על ידי ספרים מנוסים.',
  imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop',
  contact: {
    phone: '03-123-4567',
    whatsapp: '972501234567',
    waze: 'https://waze.com/ul?ll=32.08,34.78&navigate=yes',
    instagram: 'gentleman_tlv',
  },
  workingHours: {
    0: { open: '09:00', close: '19:00' }, // Sunday
    1: { open: '09:00', close: '20:00' }, // Monday
    2: { open: '09:00', close: '20:00' }, // Tuesday
    3: { open: '09:00', close: '20:00' }, // Wednesday
    4: { open: '09:00', close: '20:00' }, // Thursday
    5: { open: '09:00', close: '15:00' }, // Friday (short)
    6: null,                               // Saturday (closed)
  },
}

// ─── Mock Current User ────────────────────────────────────────────────────────

export const CURRENT_USER: CustomerProfile = {
  id: 'user-1',
  name: 'ישראל ישראלי',
  phone: '050-000-0001',
  avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
}

// ─── Time Slot Generator ──────────────────────────────────────────────────────

export function getTimeSlotsForDate(providerId: string, date: string): TimeSlot[] {
  const slots: TimeSlot[] = []
  const d = new Date(date)
  const dayOfWeek = d.getDay() // 0=Sunday

  // Saturday is closed
  if (dayOfWeek === 6) return []

  // Friday short hours
  const closeHour = dayOfWeek === 5 ? 15 : 19
  const openHour = 9

  // Deterministic "occupied" slots based on date hash
  const hash = date.split('-').reduce((a, b) => a + parseInt(b), 0)
  const occupiedCount = 3 + (hash % 3)
  const totalSlots = Math.floor(((closeHour - openHour) * 60) / 30)
  const occupiedIndices = new Set<number>()
  let seed = hash
  while (occupiedIndices.size < occupiedCount) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    occupiedIndices.add(seed % totalSlots)
  }

  let idx = 0
  for (let h = openHour; h < closeHour; h++) {
    for (let m = 0; m < 60; m += 30) {
      const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
      slots.push({ time, available: !occupiedIndices.has(idx) })
      idx++
    }
  }

  return slots
}

// ─── Owner Appointments (with staff names) ────────────────────────────────────

export const OWNER_APPOINTMENTS: Appointment[] = [
  {
    id: 'oa-1',
    providerId: 'gentleman-barber',
    providerName: 'ג׳נטלמן',
    providerAvatar: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop',
    serviceId: 'g1',
    serviceName: 'תספורת גברים',
    durationMins: 30,
    priceILS: 60,
    date: '2026-06-10',
    time: '09:00',
    status: 'confirmed',
    createdAt: '2026-06-09T18:00:00Z',
    staffName: 'מיכאל ברק',
    staffId: 'staff-1',
  },
  {
    id: 'oa-2',
    providerId: 'gentleman-barber',
    providerName: 'ג׳נטלמן',
    providerAvatar: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop',
    serviceId: 'g4',
    serviceName: 'תספורת + גילוח',
    durationMins: 60,
    priceILS: 130,
    date: '2026-06-10',
    time: '10:00',
    status: 'confirmed',
    createdAt: '2026-06-08T10:00:00Z',
    staffName: 'אריאל כהן',
    staffId: 'staff-2',
  },
  {
    id: 'oa-3',
    providerId: 'gentleman-barber',
    providerName: 'ג׳נטלמן',
    providerAvatar: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop',
    serviceId: 'g3',
    serviceName: 'עיצוב זקן',
    durationMins: 20,
    priceILS: 50,
    date: '2026-06-10',
    time: '11:30',
    status: 'confirmed',
    createdAt: '2026-06-07T14:00:00Z',
    staffName: 'מיכאל ברק',
    staffId: 'staff-1',
  },
  {
    id: 'oa-4',
    providerId: 'gentleman-barber',
    providerName: 'ג׳נטלמן',
    providerAvatar: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop',
    serviceId: 'g2',
    serviceName: 'גילוח קלאסי',
    durationMins: 45,
    priceILS: 80,
    date: '2026-06-11',
    time: '09:30',
    status: 'pending',
    createdAt: '2026-06-10T08:00:00Z',
    staffName: 'אריאל כהן',
    staffId: 'staff-2',
  },
  {
    id: 'oa-5',
    providerId: 'gentleman-barber',
    providerName: 'ג׳נטלמן',
    providerAvatar: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop',
    serviceId: 'g5',
    serviceName: 'קאט ועיצוב',
    durationMins: 75,
    priceILS: 150,
    date: '2026-06-09',
    time: '15:00',
    status: 'completed',
    createdAt: '2026-06-05T11:00:00Z',
    staffName: 'מיכאל ברק',
    staffId: 'staff-1',
  },
]
