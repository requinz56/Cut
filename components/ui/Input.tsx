'use client'

interface InputProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  type?: 'text' | 'tel' | 'email' | 'search' | 'number'
  error?: string
  hint?: string
  dir?: 'rtl' | 'ltr'
  disabled?: boolean
  icon?: React.ReactNode
  required?: boolean
}

export default function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error,
  hint,
  dir,
  disabled = false,
  icon,
  required = false,
}: InputProps) {
  // Tel inputs should always be LTR
  const inputDir = dir ?? (type === 'tel' ? 'ltr' : 'rtl')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-text-primary">
          {label}
          {required && <span className="text-status-cancelled me-1"> *</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 end-3 flex items-center text-text-muted pointer-events-none">
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          dir={inputDir}
          disabled={disabled}
          inputMode={type === 'tel' ? 'numeric' : undefined}
          className={[
            'w-full bg-surface-card border rounded-md px-3 py-3 text-base text-text-primary placeholder:text-text-muted',
            'focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error ? 'border-status-cancelled' : 'border-surface-border',
            icon ? 'pe-10' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
      </div>
      {error && (
        <p className="text-sm text-status-cancelled">{error}</p>
      )}
      {hint && !error && (
        <p className="text-sm text-text-muted">{hint}</p>
      )}
    </div>
  )
}
