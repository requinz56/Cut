'use client'

import AppShell from '@/components/layout/AppShell'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: ErrorProps) {
  return (
    <AppShell showBottomNav={false}>
      <div className="flex flex-col items-center justify-center min-h-dvh px-6 text-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
          <span className="text-3xl" aria-hidden="true">⚠️</span>
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-text-primary">משהו השתבש</h1>
          <p className="text-sm text-text-secondary">אירעה שגיאה בלתי צפויה. אנא נסה שוב.</p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-blue text-white font-semibold text-sm transition-opacity active:opacity-80"
        >
          נסה שוב
        </button>
      </div>
    </AppShell>
  )
}
