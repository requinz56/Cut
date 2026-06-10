'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import PageHeader from '@/components/layout/PageHeader'
import TimeSlotGrid from '@/components/domain/TimeSlotGrid'
import StepIndicator from '@/components/ui/StepIndicator'
import Button from '@/components/ui/Button'
import { useBooking } from '@/context/BookingContext'
import { getTimeSlotsForDate } from '@/lib/mock-data'
import {
  getCalendarWeeks,
  getMonthLabel,
  HEBREW_DAY_LABELS,
  formatDayShort,
  isDateInMonth,
  isDateToday,
  isDateSelected,
  isDateDisabled,
  toDateString,
  addMonths,
  subMonths,
} from '@/lib/date-utils'

export default function DateTimePage() {
  const router = useRouter()
  const { draft, provider, setDateTime } = useBooking()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | undefined>(draft.date)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(draft.time)

  useEffect(() => {
    if (!draft.providerId) router.replace('/')
  }, [draft.providerId, router])

  const weeks = getCalendarWeeks(currentMonth)
  const slots = selectedDate ? getTimeSlotsForDate(draft.providerId ?? '', selectedDate) : []

  function handleConfirm() {
    if (!selectedDate || !selectedTime) return
    setDateTime(selectedDate, selectedTime)
    router.push('/book/confirm')
  }

  return (
    <AppShell showBottomNav={false}>
      <PageHeader title="בחר תאריך ושעה" />
      <StepIndicator currentStep={3} />

      <div className="px-4 pb-6">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
            aria-label="חודש קודם"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface transition-colors tap-highlight-none"
          >
            <ChevronRight size={20} className="text-text-secondary" />
          </button>
          <span className="font-semibold text-text-primary">{getMonthLabel(currentMonth)}</span>
          <button
            type="button"
            onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
            aria-label="חודש הבא"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface transition-colors tap-highlight-none"
          >
            <ChevronLeft size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {HEBREW_DAY_LABELS.map((label) => (
            <div key={label} className="text-center text-xs font-medium text-text-muted py-1" dir="rtl">
              {label}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="space-y-1 mb-6">
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7">
              {week.map((day, di) => {
                const inMonth = isDateInMonth(day, currentMonth)
                const isToday = isDateToday(day)
                const isSelected = isDateSelected(day, selectedDate)
                const isDisabled = isDateDisabled(day)

                return (
                  <button
                    key={di}
                    type="button"
                    disabled={isDisabled || !inMonth}
                    onClick={() => {
                      if (!isDisabled && inMonth) {
                        setSelectedDate(toDateString(day))
                        setSelectedTime(undefined)
                      }
                    }}
                    className={[
                      'relative h-9 w-full flex items-center justify-center text-sm rounded-full transition-all tap-highlight-none',
                      !inMonth ? 'invisible' : '',
                      isDisabled ? 'text-text-muted cursor-not-allowed' : 'cursor-pointer',
                      isSelected
                        ? 'bg-blue text-white font-semibold'
                        : isToday && !isDisabled
                        ? 'border border-blue text-blue font-semibold'
                        : !isDisabled && inMonth
                        ? 'hover:bg-blue-light text-text-primary'
                        : 'text-text-muted',
                    ].join(' ')}
                  >
                    {formatDayShort(day)}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Time slots */}
        {selectedDate && (
          <div className="mb-6">
            <p className="text-sm font-semibold text-text-primary mb-3">שעות פנויות</p>
            <TimeSlotGrid
              slots={slots}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
            />
          </div>
        )}

        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!selectedDate || !selectedTime}
          onClick={handleConfirm}
        >
          המשך
        </Button>
      </div>
    </AppShell>
  )
}
