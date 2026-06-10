'use client'

interface TextareaProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  error?: string
  rows?: number
  disabled?: boolean
  maxLength?: number
}

export default function Textarea({
  label,
  placeholder,
  value,
  onChange,
  error,
  rows = 4,
  disabled = false,
  maxLength,
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-text-primary">{label}</label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        maxLength={maxLength}
        className={[
          'w-full bg-surface-card border rounded-md px-3 py-3 text-base text-text-primary placeholder:text-text-muted resize-none',
          'focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-colors',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error ? 'border-status-cancelled' : 'border-surface-border',
        ]
          .filter(Boolean)
          .join(' ')}
      />
      <div className="flex items-center justify-between">
        {error ? (
          <p className="text-sm text-status-cancelled">{error}</p>
        ) : (
          <span />
        )}
        {maxLength && (
          <p className="text-xs text-text-muted" dir="ltr">
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  )
}
