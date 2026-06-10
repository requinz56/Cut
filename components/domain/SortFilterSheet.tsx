'use client'

import { Check } from 'lucide-react'
import BottomSheet from '@/components/ui/BottomSheet'

export type SortOption = 'rating' | 'price-asc' | 'price-desc' | 'name'

const SORT_OPTIONS: { value: SortOption; label: string; sublabel: string }[] = [
  { value: 'rating',     label: 'דירוג',           sublabel: 'מהגבוה לנמוך' },
  { value: 'price-asc',  label: 'מחיר: מהנמוך',   sublabel: 'הזול ביותר קודם' },
  { value: 'price-desc', label: 'מחיר: מהגבוה',   sublabel: 'היקר ביותר קודם' },
  { value: 'name',       label: 'שם',              sublabel: 'סדר אלפביתי' },
]

interface SortFilterSheetProps {
  open: boolean
  onClose: () => void
  selected: SortOption
  onSelect: (value: SortOption) => void
}

export default function SortFilterSheet({ open, onClose, selected, onSelect }: SortFilterSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} title="מיון תוצאות">
      <div className="space-y-1">
        {SORT_OPTIONS.map((opt) => {
          const active = selected === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onSelect(opt.value); onClose() }}
              className={[
                'w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all tap-highlight-none',
                active
                  ? 'bg-blue-xlight border border-blue/20'
                  : 'bg-surface border border-transparent hover:bg-blue-xlight',
              ].join(' ')}
            >
              <div className="text-start">
                <p className={`text-sm font-semibold ${active ? 'text-blue' : 'text-text-primary'}`}>
                  {opt.label}
                </p>
                <p className="text-xs text-text-muted">{opt.sublabel}</p>
              </div>
              {active && <Check size={18} className="text-blue flex-shrink-0" />}
            </button>
          )
        })}
      </div>
    </BottomSheet>
  )
}
