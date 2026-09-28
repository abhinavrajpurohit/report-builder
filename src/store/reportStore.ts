import { create } from 'zustand'
import type { Dimension, Metric, ReportFilter } from '../types/report'

interface ReportStore {
  dimension: Dimension
  metrics: Metric[]
  filters: ReportFilter[]
  setDimension: (dimension: Dimension) => void
  toggleMetric: (metric: Metric) => void
  addFilter: (filter: ReportFilter) => void
  updateFilter: (id: string, patch: Partial<ReportFilter>) => void
  removeFilter: (id: string) => void
}

const MAX_METRICS = 3

export const useReportStore = create<ReportStore>((set) => ({
  dimension: 'country',
  metrics: ['sessions', 'revenue'],
  filters: [],

  setDimension: (dimension) => set({ dimension }),

  toggleMetric: (metric) =>
    set((state) => {
      const isSelected = state.metrics.includes(metric)
      if (isSelected) {
        return { metrics: state.metrics.filter((m) => m !== metric) }
      }
      if (state.metrics.length >= MAX_METRICS) return state
      return { metrics: [...state.metrics, metric] }
    }),

  addFilter: (filter) => set((state) => ({ filters: [...state.filters, filter] })),

  updateFilter: (id, patch) =>
    set((state) => ({
      filters: state.filters.map((f) => (f.id === id ? ({ ...f, ...patch } as ReportFilter) : f)),
    })),

  removeFilter: (id) =>
    set((state) => ({ filters: state.filters.filter((f) => f.id !== id) })),
}))