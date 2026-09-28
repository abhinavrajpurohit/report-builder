import { MOCK_DATA } from '../data/mockData'
import type { RawDataRow } from '../types/report'

const SIMULATED_LATENCY_MS = 400
const FAILURE_RATE = 0.1

export class ReportFetchError extends Error {
  constructor() {
    super('Failed to load report data. This is a simulated, transient failure — try again.')
    this.name = 'ReportFetchError'
  }
}

/**
 * Fetching Mock Data
 */
export function fetchReportData(): Promise<RawDataRow[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < FAILURE_RATE) {
        reject(new ReportFetchError())
        return
      }
      resolve(MOCK_DATA)
    }, SIMULATED_LATENCY_MS)
  })
}