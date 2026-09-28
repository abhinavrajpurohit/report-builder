import type {
  AggregatedRow,
  Dimension,
  Metric,
  RawDataRow,
  ReportFilter,
} from '../types/report'
import { isSummableMetric } from '../types/report'

function rowMatchesFilter(row: RawDataRow, filter: ReportFilter): boolean {
  if (filter.field === 'date') {
    return row.date >= filter.from && row.date <= filter.to
  }
  const rowValue = row[filter.field]
  return filter.operator === 'equals' ? rowValue === filter.value : rowValue !== filter.value
}

export function applyFilters(rows: RawDataRow[], filters: ReportFilter[]): RawDataRow[] {
  if (filters.length === 0) return rows
  return rows.filter((row) => filters.every((filter) => rowMatchesFilter(row, filter)))
}

type GroupTotals = {
  sessions: number
  revenue: number
  conversions: number
  bounces: number
  totalVisits: number
}

export function aggregateData(
  rows: RawDataRow[],
  dimension: Dimension,
  metrics: Metric[],
): AggregatedRow[] {
  // Pass 1: accumulate raw totals per group
  const groups = new Map<string, GroupTotals>()

  for (const row of rows) {
    const key = String(row[dimension])
    const totals = groups.get(key) ?? {
      sessions: 0, revenue: 0, conversions: 0, bounces: 0, totalVisits: 0,
    }
    totals.sessions += row.sessions
    totals.revenue += row.revenue
    totals.conversions += row.conversions
    totals.bounces += row.bounces
    totals.totalVisits += row.totalVisits
    groups.set(key, totals)
  }

  // Pass 2: turn totals into the metrics the user asked for
  const result: AggregatedRow[] = []
  for (const [key, totals] of groups) {
    const aggregated: AggregatedRow = { key }
    for (const metric of metrics) {
      if (isSummableMetric(metric)) {
        aggregated[metric] = totals[metric]
      } else {
        // bounceRate: divide the SUMS, once, at the end
        aggregated.bounceRate = totals.totalVisits === 0 ? 0 : totals.bounces / totals.totalVisits
      }
    }
    result.push(aggregated)
  }

  result.sort((a, b) => a.key.localeCompare(b.key))
  return result
}