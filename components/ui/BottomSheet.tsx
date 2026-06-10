'use client'

import { useEffect, useRef } from 'react'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export default function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ maxWidth: '430px', left: '50%', transform: 'translateX(-50%)' }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        className="relative w-full bg-white rounded-t-3xl shadow-modal pb-safe animate-fade-up"
        style={{ animation: 'fadeUp 220ms ease-out both' }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-surface-border" />
        </div>
        {title && (
          <div className="px-5 pt-2 pb-3 border-b border-surface-border">
            <h2 className="text-base font-extrabold text-text-primary">{title}</h2>
          </div>
        )}
        <div className="px-4 py-4">{children}</div>
      </div>
    </div>
  )
}
