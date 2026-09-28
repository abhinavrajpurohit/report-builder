interface EmptyStateProps {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex h-80 flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-line px-4 text-center">
      <p className="text-sm font-medium text-ink">{title}</p>
      <p className="text-sm text-muted">{description}</p>
    </div>
  )
}