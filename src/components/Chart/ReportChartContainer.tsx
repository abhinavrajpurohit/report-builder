import { useMemo } from 'react'
import { useReportStore } from '../../store/reportStore'
import { useReportData } from '../../hooks/useReportData'
import { aggregateData, applyFilters } from '../../utils/aggregation'
import { buildChartOptions } from '../../utils/chartOptions'
import { EmptyState } from '../shared/EmptyState'
import { ErrorState } from '../shared/ErrorState'
import { LoadingSkeleton } from '../shared/LoadingSkeleton'
import ReportChart from './ReportChart'

export function ReportChartContainer() {
  const dimension = useReportStore((s) => s.dimension)
  const metrics = useReportStore((s) => s.metrics)
  const filters = useReportStore((s) => s.filters)

  const { data, isPending, isError, error, isFetching, refetch } = useReportData({
    dimension,
    metrics,
    filters,
  })

  // Derived state computed from its sources, never stored.
  const aggregated = useMemo(
    () => (data ? aggregateData(applyFilters(data, filters), dimension, metrics) : []),
    [data, filters, dimension, metrics],
  )

  const options = useMemo(
    () => buildChartOptions(dimension, metrics, aggregated),
    [dimension, metrics, aggregated],
  )

  if (metrics.length === 0) {
    return (
      <EmptyState
        title="Select at least one metric"
        description="Choose a metric on the left to see a chart here."
      />
    )
  }

  if (isPending) return <LoadingSkeleton />

  if (isError && !data) {
    return <ErrorState message={error.message} onRetry={() => refetch()} />
  }

  if (aggregated.length === 0) {
    return (
      <EmptyState
        title="No data matches these filters"
        description="Try removing or adjusting a filter."
      />
    )
  }

  return (
    <div aria-busy={isFetching} className={isFetching ? 'opacity-60 transition-opacity' : undefined}>
      <ReportChart options={options} />
    </div>
  )
}