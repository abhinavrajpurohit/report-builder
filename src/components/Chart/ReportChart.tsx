import Highcharts from 'highcharts';
import HighchartsReactModule from 'highcharts-react-official';

const HighchartsReact =
  HighchartsReactModule.default ?? HighchartsReactModule;

export default function ReportChart({ options }) {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}
// const HighchartsReact = HighchartsReactModule.default

// export default function ReportChart({ options }: ReportChartProps) {
//   return <HighchartsReact highcharts={Highcharts} options={options} />
// }

// import Highcharts from 'highcharts'
// import HighchartsReact from 'highcharts-react-official'
// import type { Options } from 'highcharts'

// interface ReportChartProps {
//   options: Options
// }

// console.log('HighchartsReact:', HighchartsReact)
// console.log('typeof HighchartsReact:', typeof HighchartsReact)

// export default function ReportChart({ options }: ReportChartProps) {
//   return <HighchartsReact highcharts={Highcharts} options={options} />
// }