import { useQuery } from '@tanstack/react-query'
import { fetchReportData } from '../api/reportApi'
import type { ReportConfig } from '../types/report'

export function useReportData(config: ReportConfig) {
  return useQuery({
    queryKey: ['reportData', config.dimension, config.metrics, config.filters],
    queryFn: fetchReportData,
    staleTime: 30_000,
    enabled: config.metrics.length > 0,
  })
}