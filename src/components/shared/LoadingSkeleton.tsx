const BAR_HEIGHTS = [40, 65, 50, 80, 35, 60]

export function LoadingSkeleton() {
  return (
    <div role="status" className="h-80 rounded-lg border border-line p-4">
      <span className="sr-only">Loading report data…</span>
      <div aria-hidden="true" className="flex h-full items-end gap-3">
        {
          BAR_HEIGHTS.map((height, i) => (
            <div
              key={i}
              className="flex-1 animate-pulse rounded-t bg-line"
              style={{ height: `${height}%` }}
            />
          ))
        }
      </div>
    </div>
  )
}