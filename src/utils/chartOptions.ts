import type { Options, SeriesColumnOptions, SeriesLineOptions } from 'highcharts'
import type { AggregatedRow, Dimension, Metric } from '../types/report'

const METRIC_LABELS: Record<Metric, string> = {
  sessions: 'Sessions',
  revenue: 'Revenue',
  conversions: 'Conversions',
  bounceRate: 'Bounce rate',
}

function seriesValues(data: AggregatedRow[], metric: Metric): (number | null)[] {
  if (metric === 'bounceRate') {
    // fraction -> percentage, at the presentation boundary
    return data.map((row) => (row.bounceRate != null ? row.bounceRate * 100 : null))
  }
  return data.map((row) => row[metric] ?? null)
}

export function buildChartOptions(
  dimension: Dimension,
  metrics: Metric[],
  data: AggregatedRow[],
): Options {
  const seriesType = dimension === 'date' ? 'line' : 'column'
  const categories = data.map((row) => row.key)

  const bounceRateNeedsOwnAxis = metrics.includes('bounceRate') && metrics.length > 1
  const bounceRateIsOnlyMetric = metrics.length === 1 && metrics[0] === 'bounceRate'

  const series: (SeriesLineOptions | SeriesColumnOptions)[] = metrics.map((metric) => ({
    type: seriesType,
    name: METRIC_LABELS[metric],
    data: seriesValues(data, metric),
    yAxis: bounceRateNeedsOwnAxis && metric === 'bounceRate' ? 1 : 0,
    tooltip: metric === 'bounceRate' ? { valueDecimals: 1, valueSuffix: '%' } : undefined,
  }))

  const primaryTitle = metrics.length === 1 ? METRIC_LABELS[metrics[0]] : undefined
  const yAxis: Options['yAxis'] = [
    bounceRateIsOnlyMetric
      ? { title: { text: 'Bounce rate' }, labels: { format: '{value}%' } }
      : { title: { text: primaryTitle } },
  ]
  if (bounceRateNeedsOwnAxis) {
    yAxis.push({ title: { text: 'Bounce rate' }, labels: { format: '{value}%' }, opposite: true })
  }

  return {
    chart: { type: seriesType, height: 340 },
    title: { text: undefined },
    xAxis: { categories },
    yAxis,
    series,
    credits: { enabled: false },
    legend: { enabled: metrics.length > 1 },
  }
}