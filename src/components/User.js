import React from 'react'
import { Group } from './ui/layout'

import Api from '../data/Api'
import userLinks from '../data/GitUrls'
import { format } from '../utils/format'
import { getLocalApiStorage } from '../utils/localStorage'

function matchInArray(string = '', expressions = []) {
  for (let i = 0; i < expressions.length; i++) {
    if (string.match(expressions[i])) {
      return true
    }
  }

  return false
}

export default function User(props) {
  const { user, api } = props

  const url = userLinks(user)[api]
  const data = getLocalApiStorage(user, 'user') ? getLocalApiStorage(user, 'user') : Api(url)

  const regExArray = [/url/, /id/]
  const keys = Object.keys(data).filter(key => !matchInArray(key, regExArray))
  const urls = Object.keys(data).filter(key => key.match(/url/))

  const renderToElement = variables => {
    const { type = 'div', props = {}, children = '' } = variables
    return React.createElement(type, props, children)
  }

  return (
    !data.message && (
      <Group id={api} className="d-flex flex-column flex-md-row mt-2">
        <div className="card card-body d-flex flex-row flex-md-column mb-2 mr-2 vw-min-25">
          <img
            src={data.avatar_url}
            alt="user avatar"
            width="100px"
            height="100px"
            className="mr-3 mb-3"
          />
          <div className="user-details">
            {keys.map((e, i) =>
              renderToElement({
                props: {
                  label: e.replace(/_/, ' '),
                  key: `${i}-${e}`,
                  className: 'primary-before'
                },
                children: format(data[e])
              })
            )}
          </div>
        </div>
        <div className="ml-2">
          <h3>api links</h3>
          <ul className="api-links vw-min-50">
            {urls
              .filter(key => ['html_url', 'avatar_url', 'url'].indexOf(key) === -1)
              .map((e, i) =>
                renderToElement({
                  type: 'li',
                  props: { className: 'link label', key: `${i}-${e}`, attr: e },
                  children: format(data[e])
                })
              )}
          </ul>
        </div>
      </Group>
    )
  )
}
User.defaultProps = {
  api: 'user',
  allowed: ['name', 'blog', 'location', 'bio']
}
