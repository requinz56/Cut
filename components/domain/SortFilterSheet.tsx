'use client'

import { Check } from 'lucide-react'
import BottomSheet from '@/components/ui/BottomSheet'

export type SortOption = 'rating' | 'price-asc' | 'price-desc' | 'name'

const SORT_OPTIONS: { value: SortOption; label: string; sublabel: string }[] = [
  { value: 'rating',     label: 'דירוג',           sublabel: 'גבוה לנמוך' },
  { value: 'price-asc',  label: 'מחיר: מהנמוך',   sublabel: 'הנמוך ביותר קודם' },
  { value: 'price-desc', label: 'מחיר: מהגבוה',   sublabel: 'הגבוה ביותר קודם' },
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
                'w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all tap-highlight-none',
                active
                  ? 'bg-blue-xlight border border-blue/25 shadow-[0_1px_4px_rgba(37,99,235,0.1)]'
                  : 'bg-white border border-surface-border/70 hover:bg-blue-xlight hover:border-blue/20',
              ].join(' ')}
            >
              <div className="text-start">
                <p className={`text-sm font-semibold ${active ? 'text-blue' : 'text-text-primary'}`}>
                  {opt.label}
                </p>
                <p className="text-xs text-text-muted mt-0.5">{opt.sublabel}</p>
              </div>
              {active && <Check size={16} className="text-blue flex-shrink-0" strokeWidth={2.5} />}
            </button>
          )
        })}
      </div>
    </BottomSheet>
  )
}
