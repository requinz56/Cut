interface StepIndicatorProps {
  currentStep: number
  totalSteps?: number
}

export default function StepIndicator({ currentStep, totalSteps = 4 }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-3 px-4">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1
        const isCompleted = step < currentStep
        const isCurrent = step === currentStep
        return (
          <div
            key={step}
            className={[
              'rounded-full transition-all duration-300',
              isCurrent
                ? 'w-6 h-2 bg-blue'
                : isCompleted
                ? 'w-2 h-2 bg-blue/50'
                : 'w-2 h-2 bg-surface-border',
            ].join(' ')}
          />
        )
      })}
    </div>
  )
}
