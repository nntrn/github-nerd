import React from 'react'

import ChartistGraph from 'react-chartist'

export default function BarChart(props) {
  const defaultOptions = {
    high: Math.max(...props.data.series.flat()) + 5,
    low: 0,
    axisX: { labelInterpolationFnc: x => x.toUpperCase().replace(/(REQUEST|EVENT)/g, '') }
  }

  const { data, title, options = defaultOptions } = props

  return (
    <div className="mt-3 barchart">
      <h3 className="mb-2">{title}</h3>
      <ChartistGraph data={data} options={options} type="Bar" />
      <pre>{JSON.stringify(data)}</pre>
    </div>
  )
}
BarChart.defaultProps = {
  data: { labels: ['a', 'b', 'c'], series: [[3, 5, 8], [6, 15, 4]] },
  title: 'default chart'
}
