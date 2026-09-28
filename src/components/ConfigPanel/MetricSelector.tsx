import { METRICS, type Metric } from '../../types/report'
import { useReportStore } from '../../store/reportStore'

const LABELS: Record<Metric, string> = {
  sessions: 'Sessions',
  revenue: 'Revenue',
  conversions: 'Conversions',
  bounceRate: 'Bounce rate',
}

const MAX_METRICS = 3

export function MetricSelector() {
  const metrics = useReportStore((s) => s.metrics)
  const toggleMetric = useReportStore((s) => s.toggleMetric)
  const atLimit = metrics.length >= MAX_METRICS

  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-medium text-ink">
        Metrics <span className="font-normal text-muted">(choose up to {MAX_METRICS})</span>
      </legend>

      <div className="flex flex-col gap-2">
        {
          METRICS.map((metric) => {
            const checked = metrics.includes(metric)
            const disabled = !checked && atLimit
            return (
              <label
                key={metric}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${
                  checked ? 'border-brand bg-brand/5' : 'border-line'
                } ${disabled ? 'opacity-50' : 'cursor-pointer'}`}>
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled}
                  onChange={() => toggleMetric(metric)}
                  className="h-4 w-4" />
                <span>{LABELS[metric]}</span>
                {
                  metric === 'bounceRate' && (
                    <span className="ml-auto text-xs text-muted">ratio</span>
                  )
                }
              </label>
            )
          })
        }
      </div>

      {
        atLimit && (
          <p className="mt-2 text-xs text-muted">
            Maximum of {MAX_METRICS} metrics. Uncheck one to pick another.
          </p>
        )
      }
    </fieldset>
  )
}