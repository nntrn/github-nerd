import React from 'react'
import Api from '../data/Api'
import userLinks from '../data/GitUrls'

import ChartistGraph from 'react-chartist'

import { createQueryParam } from '../utils/url'
import { groupObjectArrays, getXY } from '../utils/chart'

export default function Events(props) {
  const { user, api, query } = props
  const url = userLinks(user)[api] + createQueryParam(query)

  const data = Api(url)

  const data2 = Object.values(data).map(item => {
    const date = new Date(item.created_at)
    return {
      date: date.toLocaleString().split(',')[0],
      month: date.getMonth(),
      day: date.getDay(),
      dayString: ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat'][date.getDay()],
      type: item['type']
    }
  })

  const groupByDayString = groupObjectArrays(data2, 'dayString')
  const groupByType = groupObjectArrays(data2, 'type')

  function formatXYAxis(data) {
    const { x, y } = getXY(data)
    return { labels: x, series: y }
  }

  const renderBarChart = (data, title) => {
    const options = {
      high: Math.max(...data.series[0]) + 5,
      low: 0,
      axisX: {
        labelInterpolationFnc: label => label.toUpperCase().replace(/(REQUEST|EVENT|COMMENT)/g, '')
      }
    }
    return (
      <div className="mt-3 barchart">
        <h4>{data.title}</h4>
        <ChartistGraph data={data} options={options} type="Bar" />
      </div>
    )
  }

  return (
    <div>
      {renderBarChart({ ...formatXYAxis(groupByDayString), title: 'git events by day' })}
      {renderBarChart({ ...formatXYAxis(groupByType), title: 'git events by event types' })}
    </div>
  )
}
Events.defaultProps = {
  query: ''
}
