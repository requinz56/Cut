'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Star } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import PageHeader from '@/components/layout/PageHeader'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import { PROVIDERS } from '@/lib/mock-data'

export default function WriteReviewPage() {
  const router = useRouter()
  const params = useParams()
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const provider = PROVIDERS.find((p) => p.id === params.id)

  function handleSubmit() {
    if (rating === 0) return
    setSubmitted(true)
    setTimeout(() => router.push(`/providers/${params.id as string}`), 1500)
  }

  if (submitted) {
    return (
      <AppShell showBottomNav={false}>
        <div className="flex flex-col items-center justify-center min-h-64 px-6 text-center">
          <span className="text-4xl mb-3">⭐</span>
          <h2 className="text-lg font-bold text-text-primary mb-1">תודה על הביקורת!</h2>
          <p className="text-sm text-text-muted">הביקורת שלך עוזרת לאחרים לבחור.</p>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell showBottomNav={false}>
      <PageHeader title="כתוב ביקורת" />
      <div className="px-4 py-6 space-y-6">
        {provider && (
          <p className="text-sm text-text-secondary">ביקורת על <strong>{provider.businessName}</strong></p>
        )}

        {/* Star picker */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm font-medium text-text-primary">דירוג</p>
          <div className="flex items-center gap-2" dir="ltr">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                aria-label={`${star} כוכבים`}
                className="tap-highlight-none transition-transform hover:scale-110"
              >
                <Star
                  size={32}
                  className={
                    star <= (hovered || rating)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-surface-border fill-surface-border'
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <Textarea
          label="הערות (אופציונלי)"
          value={text}
          onChange={setText}
          placeholder="ספר לאחרים על החוויה שלך..."
          rows={4}
          maxLength={400}
        />

        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={rating === 0}
          onClick={handleSubmit}
        >
          שלח ביקורת
        </Button>
      </div>
    </AppShell>
  )
}
