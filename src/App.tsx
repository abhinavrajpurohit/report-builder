import { ReportChartContainer } from './components/Chart/ReportChartContainer'
import { DimensionSelector } from './components/ConfigPanel/DimensionSelector'
import { MetricSelector } from './components/ConfigPanel/MetricSelector'
import { FilterBuilder } from './components/ConfigPanel/FilterBuilder'

export default function App() {
  return (
    <div className="min-h-full">
      <header className="border-b border-line bg-panel">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <h1 className="text-lg font-semibold text-ink">Report Builder</h1>
          <p className="text-sm text-muted">Pick a dimension, up to three metrics, and any filters.</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <section aria-label="Report configuration" className="flex flex-col gap-5 rounded-lg border border-line bg-panel p-4">
            <DimensionSelector />
            <MetricSelector />
            <FilterBuilder />
          </section>

          <section aria-label="Report chart" className="rounded-lg border border-line bg-panel p-4">
            <ReportChartContainer />
          </section>
        </div>
      </main>
    </div>
  )
}