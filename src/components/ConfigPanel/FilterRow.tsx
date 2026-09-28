import { CATEGORICAL_FILTER_FIELDS, type CategoricalFilterField, type ReportFilter } from '../../types/report'
import { useReportStore } from '../../store/reportStore'
import { DATE_BOUNDS, FIELD_OPTIONS } from '../../utils/fieldOptions'

const FIELD_LABELS: Record<CategoricalFilterField, string> = {
  country: 'Country',
  device: 'Device',
  channel: 'Channel',
}

const controlClass = 'rounded border border-line bg-panel px-2 py-1 text-sm'

export function FilterRow({ filter }: { filter: ReportFilter }) {
  const updateFilter = useReportStore((s) => s.updateFilter)
  const removeFilter = useReportStore((s) => s.removeFilter)

  const groupLabel = filter.field === 'date' ? 'Date range filter' : `${FIELD_LABELS[filter.field]} filter`

  return (
    <div
      role="group"
      aria-label={groupLabel}
      className="flex flex-wrap items-center gap-2 rounded-md border border-line bg-canvas px-3 py-2">
      {
        filter.field === 'date' ? (
          <>
            <span className="text-sm font-medium">Date</span>
            <input
              type="date"
              value={filter.from}
              min={DATE_BOUNDS.min}
              max={filter.to || DATE_BOUNDS.max}
              onChange={(e) => updateFilter(filter.id, { from: e.target.value })}
              aria-label="From date"
              className={controlClass} />
            <span className="text-sm text-muted">to</span>
            <input
              type="date"
              value={filter.to}
              min={filter.from || DATE_BOUNDS.min}
              max={DATE_BOUNDS.max}
              onChange={(e) => updateFilter(filter.id, { to: e.target.value })}
              aria-label="To date"
              className={controlClass} />
          </>
        ) : (
          <>
            <select
              value={filter.field}
              onChange={(e) => {
                const field = e.target.value as CategoricalFilterField
                updateFilter(filter.id, { field, value: FIELD_OPTIONS[field][0] })
              }}
              aria-label="Filter field"
              className={controlClass}>
              {
                CATEGORICAL_FILTER_FIELDS.map((f) => (
                  <option key={f} value={f}>{FIELD_LABELS[f]}</option>
                ))
              }
            </select>

            <select
              value={filter.operator}
              onChange={(e) => updateFilter(filter.id, { operator: e.target.value as 'equals' | 'not-equals' })}
              aria-label="Filter operator"
              className={controlClass}>
              <option value="equals">is</option>
              <option value="not-equals">is not</option>
            </select>

            <select
              value={filter.value}
              onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
              aria-label="Filter value"
              className={controlClass}>
              {
                FIELD_OPTIONS[filter.field].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))
              }
            </select>
          </>
        )
      }

      <button
        type="button"
        onClick={() => removeFilter(filter.id)}
        aria-label={`Remove ${groupLabel.toLowerCase()}`}
        className="ml-auto text-sm text-muted hover:text-danger">
        Remove
      </button>
    </div>
  )
}