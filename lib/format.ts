export function formatPrice(amount: number): string {
  return `${amount.toLocaleString('he-IL')} ₪`
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} דקות`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (m === 0) return `${h} שעה${h > 1 ? 'ות' : ''}`
  return `${h} שעה${h > 1 ? 'ות' : ''} ${m} דקות`
}

export function formatPhone(phone: string): string {
  return phone
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function generateDefaultAbout(
  category: string,
  services: string[]
): string {
  const categoryLabels: Record<string, string> = {
    barber: 'ספר',
    nails: 'ציפורניים',
    hair: 'שיער',
    cosmetics: 'קוסמטיקה',
    massage: 'עיסוי',
    fitness: 'כושר',
  }
  const label = categoryLabels[category] || category
  const topServices = services.slice(0, 2).join(', ')
  return `עסק ${label} מקצועי המציע שירותים איכותיים כולל ${topServices}. אנחנו כאן לתת לך את הטיפול הטוב ביותר.`
}
