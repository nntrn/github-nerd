import React from 'react'
import Form from './components/ui/Form'
import User from './components/User'
import Events from './components/Events'
import BarChart from './components/BarChart'

import { DataOutput } from './components/DataViewer'

import './style/style.scss'

function getUrl() {
  const arr = window.location.search.replace('?', '').split('&')
  const obj = {}
  arr.forEach((e, i) => {
    let a = e.split('=')
    obj[a[0]] = a[1]
  })
  return obj
}

export default function App(props) {
  const user = getUrl().user || props.user

  return (
    <div>
      <Form input={{ user: { value: user, type: 'text' } }} />
      <User user={user} />

      <DataOutput
        user={user}
        api="starred"
        query={{ per_page: 100, sort: 'updated' }}
        columns={['full_name', 'html_url', 'description', 'language', 'created_at', 'updated_at']}
        title="starred repos"
        groupBy="language"
      />
      <DataOutput
        user={user}
        api="repos"
        query={{ per_page: 100, sort: 'updated' }}
        columns={['full_name', 'description', 'updated_at', 'has_issues']}
        title="user repos"
        groupBy="has_issues"
      />
      {/* TODO: refactor events  */}
      <Events user={user} api="events" query={{ per_page: 100, sort: 'updated' }} />
    </div>
  )
}
App.defaultProps = {
  user: 'nntrn'
}
