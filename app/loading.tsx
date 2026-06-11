export default function Loading() {
  return (
    <div className="min-h-dvh bg-surface flex justify-center">
      <div className="app-shell w-full flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-blue border-t-transparent animate-spin" />
      </div>
    </div>
  )
}
