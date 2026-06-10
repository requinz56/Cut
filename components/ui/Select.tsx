'use client'

interface SelectProps {
  label?: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  error?: string
  disabled?: boolean
  placeholder?: string
}

export default function Select({
  label,
  value,
  onChange,
  options,
  error,
  disabled = false,
  placeholder,
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-text-primary">{label}</label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={[
          'w-full bg-surface-card border rounded-md px-3 py-3 text-base text-text-primary appearance-none cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-colors',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error ? 'border-status-cancelled' : 'border-surface-border',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-status-cancelled">{error}</p>}
    </div>
  )
}
