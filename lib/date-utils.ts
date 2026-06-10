import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameDay,
  isSameMonth,
  isToday,
  isPast,
  parseISO,
  startOfMonth,
  endOfMonth,
  addWeeks,
  getDay,
} from 'date-fns'

// Sunday-first week (Israel)
export const WEEK_START: 0 = 0

// Hebrew day abbreviations Sun–Sat
export const HEBREW_DAY_LABELS = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳']

// Hebrew month names
export const HEBREW_MONTHS = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר',
]

export function getMonthLabel(date: Date): string {
  return `${HEBREW_MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

export function getCalendarWeeks(date: Date): Date[][] {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: WEEK_START })
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: WEEK_START })
  const days = eachDayOfInterval({ start, end })

  const weeks: Date[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  return weeks
}

export function formatDateIL(dateStr: string): string {
  const d = parseISO(dateStr)
  return format(d, 'dd/MM/yyyy')
}

export function formatDateLong(dateStr: string): string {
  const d = parseISO(dateStr)
  const day = format(d, 'd')
  const month = HEBREW_MONTHS[d.getMonth()]
  const year = format(d, 'yyyy')
  return `${day} ב${month} ${year}`
}

export function formatDayShort(date: Date): string {
  return format(date, 'd')
}

export function isDateInMonth(date: Date, month: Date): boolean {
  return isSameMonth(date, month)
}

export function isDateToday(date: Date): boolean {
  return isToday(date)
}

export function isDateSelected(date: Date, selected: string | undefined): boolean {
  if (!selected) return false
  return isSameDay(date, parseISO(selected))
}

export function isDatePast(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

export function isDateDisabled(date: Date): boolean {
  // Saturday is closed
  if (getDay(date) === 6) return true
  return isDatePast(date)
}

export function toDateString(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export { addMonths, subMonths, isSameDay }
