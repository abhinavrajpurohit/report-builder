import { useId } from 'react'
import { CATEGORICAL_FILTER_FIELDS, type CategoricalFilterField } from '../../types/report'
import { useReportStore } from '../../store/reportStore'
import { DATE_BOUNDS, FIELD_OPTIONS } from '../../utils/fieldOptions'
import { FilterRow } from './FilterRow'

export function FilterBuilder() {
  const filters = useReportStore((s) => s.filters)
  const addFilter = useReportStore((s) => s.addFilter)
  const selectId = useId()

  function handleAdd(choice: CategoricalFilterField | 'date') {
    const id = crypto.randomUUID()
    if (choice === 'date') {
      addFilter({ id, field: 'date', operator: 'between', from: DATE_BOUNDS.min, to: DATE_BOUNDS.max })
    } else {
      addFilter({ id, field: choice, operator: 'equals', value: FIELD_OPTIONS[choice][0] })
    }
  }

  return (
    <div>
      <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-ink">
        Filters
      </label>

      {
        filters.length > 0 && (
          <div className="mb-2 flex flex-col gap-2">
            {
              filters.map((filter) => (
                <FilterRow key={filter.id} filter={filter} />
              ))
            }
          </div>
        )
      }

      <select
        id={selectId}
        value=""
        onChange={(e) => {
          if (e.target.value) handleAdd(e.target.value as CategoricalFilterField | 'date')
        }}
        className="w-full rounded-md border border-dashed border-line bg-panel px-3 py-2 text-sm text-muted">
        <option value="">+ Add filter…</option>
        <option value="date">Date range</option>
        {
          CATEGORICAL_FILTER_FIELDS.map((f) => (
            <option key={f} value={f}>{f[0].toUpperCase() + f.slice(1)}</option>
          ))
        }
      </select>
    </div>
  )
}