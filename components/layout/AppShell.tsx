interface AppShellProps {
  children: React.ReactNode
  showBottomNav?: boolean
  className?: string
}

export default function AppShell({ children, showBottomNav = true, className = '' }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-surface flex justify-center">
      <div
        className={[
          'app-shell w-full bg-white relative',
          showBottomNav ? 'pb-safe' : 'pb-6',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    </div>
  )
}
