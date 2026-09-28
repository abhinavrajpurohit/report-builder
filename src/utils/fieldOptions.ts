import { MOCK_DATA } from '../data/mockData'
import type { CategoricalFilterField } from '../types/report'

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values)).sort()
}

export const FIELD_OPTIONS: Record<CategoricalFilterField, string[]> = {
  country: uniqueSorted(MOCK_DATA.map((r) => r.country)),
  device: uniqueSorted(MOCK_DATA.map((r) => r.device)),
  channel: uniqueSorted(MOCK_DATA.map((r) => r.channel)),
}

const sortedDates = MOCK_DATA.map((r) => r.date).sort()
export const DATE_BOUNDS = {
  min: sortedDates[0],
  max: sortedDates[sortedDates.length - 1],
}