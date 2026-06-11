import Link from 'next/link'
import AppShell from '@/components/layout/AppShell'

export default function NotFound() {
  return (
    <AppShell showBottomNav={false}>
      <div className="flex flex-col items-center justify-center min-h-dvh px-6 text-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-light flex items-center justify-center">
          <span className="text-3xl" aria-hidden="true">🔍</span>
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-text-primary">הדף לא נמצא</h1>
          <p className="text-sm text-text-secondary">הכתובת שביקשת אינה קיימת במערכת.</p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-blue text-white font-semibold text-sm transition-opacity active:opacity-80"
        >
          חזרה לדף הבית
        </Link>
      </div>
    </AppShell>
  )
}
