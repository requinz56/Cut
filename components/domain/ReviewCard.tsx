import type { Review } from '@/types'
import StarRating from '@/components/ui/StarRating'
import { formatDateLong } from '@/lib/date-utils'

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-surface-border/70 shadow-[0_1px_6px_rgba(37,99,235,0.05)] p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-blue-xlight ring-1 ring-blue/20 flex items-center justify-center text-blue font-bold text-sm flex-shrink-0">
            {review.authorName.charAt(0)}
          </div>
          <div>
            <span className="font-semibold text-text-primary text-sm leading-tight">{review.authorName}</span>
            <div className="mt-0.5">
              <StarRating rating={review.rating} size={12} showNumber={false} />
            </div>
          </div>
        </div>
        <span className="text-[11px] text-text-muted mt-0.5">{formatDateLong(review.date)}</span>
      </div>
      <p className="text-sm text-text-secondary leading-relaxed">{review.text}</p>
    </div>
  )
}
