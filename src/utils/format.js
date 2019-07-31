import React from 'react'
import { Link } from '../components/ui/layout'

export function getTimeStamp() {
  return new Date().getTime()
}

const dateFormat = {
  ymd: { year: '2-digit', month: '2-digit', day: '2-digit' },
  time: { hour: 'numeric' }
}
export function parseDate(str, options = {}) {
  if (typeof options === 'string') {
    options = dateFormat[options]
  }
  return new Date(Date.parse(str)).toLocaleString('en-US', options)
}

// https://stackoverflow.com/a/34695026
function isValidURL(str) {
  var a = document.createElement('a')
  a.href = str
  return a.host && a.host !== window.location.host
}

export function formatURL(string) {
  if (isValidURL(string)) {
    const url = string.replace(/\/?{.*}/g, '')
    return (
      <Link href={url} after={string.match(/\/?{.*}/g)} opentab="true">
        {url.replace(/^.*\/\//g, '')}
      </Link>
    )
  }
  return string
}
export function format(string, options) {
  if (isValidURL(string)) {
    const url = string.replace(/\/?{.*}/g, '')
    return (
      <Link href={url} after={string.match(/\/?{.*}/g)} opentab="true">
        {url.replace(/^.*\/\//g, '')}
      </Link>
    )
  }
  if (typeof string === 'string' && Date.parse(string) && string.length > 6) {
    return <span typeof={Date.parse(string)}>{parseDate(string, options)}</span>
  }

  if (string && typeof string === 'object') {
    string = JSON.stringify(string)
  }
  return string
}
