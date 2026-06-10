import type { Review } from '@/types'
import StarRating from '@/components/ui/StarRating'
import { formatDateLong } from '@/lib/date-utils'

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="border-b border-surface-border last:border-0 pb-4 last:pb-0">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-light flex items-center justify-center text-blue font-semibold text-sm flex-shrink-0">
            {review.authorName.charAt(0)}
          </div>
          <span className="font-medium text-text-primary text-sm">{review.authorName}</span>
        </div>
        <span className="text-xs text-text-muted">{formatDateLong(review.date)}</span>
      </div>
      <StarRating rating={review.rating} size={13} showNumber={false} />
      <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">{review.text}</p>
    </div>
  )
}
