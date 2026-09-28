import { useId } from 'react'
import { DIMENSIONS, type Dimension } from '../../types/report'
import { useReportStore } from '../../store/reportStore'

const LABELS: Record<Dimension, string> = {
  date: 'Date',
  country: 'Country',
  device: 'Device',
  channel: 'Channel',
  campaign: 'Campaign',
}

export function DimensionSelector() {
  const dimension = useReportStore((s) => s.dimension)
  const setDimension = useReportStore((s) => s.setDimension)
  const selectId = useId()

  return (
    <div>
      <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-ink">
        Dimension
      </label>
      <select
        id={selectId}
        value={dimension}
        onChange={(e) => setDimension(e.target.value as Dimension)}
        className="w-full rounded-md border border-line bg-panel px-3 py-2 text-sm text-ink">
        {
          DIMENSIONS.map((d) => (
            <option key={d} value={d}>
              {LABELS[d]}
            </option>
          ))
        }
      </select>
    </div>
  )
}