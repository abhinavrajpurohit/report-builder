/**
 * Interface & types for the Report Builder.
 */

export const DIMENSIONS = ['date', 'country', 'device', 'channel', 'campaign'] as const
export type Dimension = (typeof DIMENSIONS)[number]

export const METRICS = ['sessions', 'revenue', 'conversions', 'bounceRate'] as const
export type Metric = (typeof METRICS)[number]

// Metrics that are simple sums across rows. bounceRate is deliberately excluded
export const SUMMABLE_METRICS = ['sessions', 'revenue', 'conversions'] as const
export type SummableMetric = (typeof SUMMABLE_METRICS)[number]

export function isSummableMetric(metric: Metric): metric is SummableMetric {
  return (SUMMABLE_METRICS as readonly string[]).includes(metric)
}

// Fields a `equals` / `not-equals` filter can target
export const CATEGORICAL_FILTER_FIELDS = ['country', 'device', 'channel'] as const
export type CategoricalFilterField = (typeof CATEGORICAL_FILTER_FIELDS)[number]

export interface CategoricalFilter {
  id: string
  field: CategoricalFilterField
  operator: 'equals' | 'not-equals'
  value: string
}

export interface DateRangeFilter {
  id: string
  field: 'date'
  operator: 'between'
  from: string 
  to: string 
}

export type ReportFilter = CategoricalFilter | DateRangeFilter

export interface ReportConfig {
  dimension: Dimension
  metrics: Metric[]
  filters: ReportFilter[]
}

// Raw data by the mock API
export interface RawDataRow {
  date: string
  country: string
  device: string
  channel: string
  campaign: string
  sessions: number
  revenue: number
  conversions: number
  bounces: number
  totalVisits: number
}

// One row of the aggregated, chart-ready result
export interface AggregatedRow {
  key: string
  sessions?: number
  revenue?: number
  conversions?: number
  bounceRate?: number
}