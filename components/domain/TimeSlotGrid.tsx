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
        אין זמנים פנויים ביום זה
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
              'py-2.5 rounded-md text-sm font-medium transition-all duration-100 tap-highlight-none',
              slot.available
                ? isSelected
                  ? 'bg-blue text-white shadow-sm'
                  : 'bg-surface border border-surface-border text-text-primary hover:border-blue hover:text-blue'
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
