import React from 'react'
import Api from '../data/Api'
import userLinks from '../data/GitUrls'
import { createQueryParam } from '../utils/url'
import { groupObjectArrays } from '../utils/chart'

export default function DataViewer(props) {
  const { user, api, query, columns } = props
  const url = userLinks(user)[api] + createQueryParam(query)

  const data = Api(url)

  // only include columns specified in props.columns
  if (columns) {
    let arr = []
    Object.values(data).forEach(item => {
      let obj = {}
      columns.forEach(e => (obj[e] = item[e]))
      arr.push(obj)
    })
    return arr
  }

  return data
}

DataViewer.defaultProps = {
  query: '',
  columns: ''
}

export function DataOutput(props) {
  const { user, api, query, title, groupBy } = props
  const viewer = {}

  viewer.data = DataViewer(props)
  viewer.keys = Array.isArray(viewer.data)
    ? Object.keys(Object.values(viewer.data))
    : Object.keys(viewer.data)

  const url = userLinks(user)[api] + createQueryParam(query)

  const dataLabels = data => {
    var label = {}
    Object.keys(data).forEach(e => (label[e] = data[e].length))
    return label
  }

  if (groupBy && viewer.keys.indexOf(groupBy)) {
    viewer.data = groupObjectArrays(viewer.data, groupBy)
    viewer.xy = dataLabels(viewer.data)
  }

  return (
    Object.values(viewer.data).length > 0 && (
      <div className="dataviewer card" url={url}>
        <h4 className="viewer-title card-header">{title || api}</h4>
        <div className="viewer-body flex-column flex-md-row card-body">
          {viewer.xy && (
            <div className="viewer-item groups pb-2 mr-2" groupby={groupBy}>
              {groupBy && (
                <div className="mb-2">
                  grouped by <code>{groupBy}</code>
                </div>
              )}
              {Object.keys(viewer.xy).map(e => (
                <button
                  className="viewer-btn btn mr-1 mb-1"
                  count={viewer.xy[e]}
                  value={e}
                  key={`${e}${viewer.xy[e]}`}
                >
                  {e}
                </button>
              ))}
            </div>
          )}
          <div className="viewer-item data h-300">
            {Object.keys(viewer.data).map(lang => {
              const idHook = `${api}-${lang}`.replace(/\s/g, '').toLowerCase()
              return (
                <div className="viewer-data" key={idHook} id={idHook}>
                  <h3 className="viewer-data-title">{lang}</h3>

                  {Object.values(viewer.data[lang]).map((item, index) => (
                    <ul group={lang} order={index} key={index} className="viewer-list card p-3">
                      {Object.entries(item).map(
                        list =>
                          typeof list[1] === 'string' && (
                            <li key={list[1]} label={list[0].replace(/_/g, ' ')}>
                              {list[1]}
                            </li>
                          )
                      )}
                    </ul>
                  ))}
                </div>
              )
            })}
          </div>
        </div>

        <a href={url} className="card-footer h-100">
          {url}
        </a>
      </div>
    )
  )
}
DataOutput.defaultProps = {
  query: '',
  title: 'DataOutput',
  groupBy: ''
}
