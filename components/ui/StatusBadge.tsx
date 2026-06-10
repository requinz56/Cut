import type { AppointmentStatus, StaffStatus } from '@/types'

type BadgeStatus = AppointmentStatus | StaffStatus

interface StatusBadgeProps {
  status: BadgeStatus
  size?: 'sm' | 'md'
}

const STATUS_CONFIG: Record<
  BadgeStatus,
  { label: string; textColor: string; bgColor: string }
> = {
  confirmed:  { label: 'מאושר',     textColor: 'text-status-confirmed',  bgColor: 'bg-status-confirmed-bg' },
  pending:    { label: 'ממתין',     textColor: 'text-status-pending',    bgColor: 'bg-status-pending-bg' },
  cancelled:  { label: 'בוטל',     textColor: 'text-status-cancelled',  bgColor: 'bg-status-cancelled-bg' },
  completed:  { label: 'הושלם',    textColor: 'text-status-completed',  bgColor: 'bg-status-completed-bg' },
  active:     { label: 'פעיל',     textColor: 'text-status-active',     bgColor: 'bg-status-active-bg' },
  inactive:   { label: 'לא פעיל',  textColor: 'text-status-inactive',  bgColor: 'bg-status-inactive-bg' },
  removed:    { label: 'הוסר',     textColor: 'text-status-removed',   bgColor: 'bg-status-removed-bg' },
}

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]
  if (!config) return null

  return (
    <span
      className={[
        'inline-flex items-center font-medium rounded-full',
        config.textColor,
        config.bgColor,
        size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1',
      ].join(' ')}
    >
      {config.label}
    </span>
  )
}
