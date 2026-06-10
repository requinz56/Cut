'use client'

import { Loader2 } from 'lucide-react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  children: React.ReactNode
}

const variantClasses = {
  primary:
    'bg-blue text-white hover:bg-blue-dark active:scale-[0.98] shadow-sm',
  secondary:
    'bg-blue-light text-blue border border-blue/20 hover:bg-blue/10 active:scale-[0.98]',
  ghost:
    'bg-transparent text-blue hover:bg-blue-light active:scale-[0.98]',
  danger:
    'bg-status-cancelled text-white hover:bg-red-700 active:scale-[0.98]',
}

const sizeClasses = {
  sm: 'text-sm px-4 py-2 rounded-md gap-1.5',
  md: 'text-base px-6 py-3 rounded-md gap-2',
  lg: 'text-lg px-6 py-4 rounded-lg gap-2',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  startIcon,
  endIcon,
  onClick,
  type = 'button',
  className = '',
  children,
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center font-medium transition-all duration-150 tap-highlight-none select-none',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        isDisabled ? 'opacity-50 cursor-not-allowed active:scale-100' : 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {loading ? (
        <Loader2 size={size === 'sm' ? 14 : 18} className="animate-spin" />
      ) : startIcon ? (
        <span className="flex-shrink-0">{startIcon}</span>
      ) : null}
      {children}
      {!loading && endIcon ? (
        <span className="flex-shrink-0">{endIcon}</span>
      ) : null}
    </button>
  )
}
