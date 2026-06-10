import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  size?: number
  showNumber?: boolean
  reviewCount?: number
}

export default function StarRating({
  rating,
  size = 14,
  showNumber = true,
  reviewCount,
}: StarRatingProps) {
  const filled = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5

  return (
    <div className="flex items-center gap-1" dir="ltr">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={size}
            className={
              i < filled
                ? 'text-amber-400 fill-amber-400'
                : i === filled && hasHalf
                ? 'text-amber-400 fill-amber-200'
                : 'text-surface-border fill-surface-border'
            }
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-sm font-medium text-text-primary">{rating.toFixed(1)}</span>
      )}
      {reviewCount !== undefined && (
        <span className="text-sm text-text-muted">({reviewCount})</span>
      )}
    </div>
  )
}
