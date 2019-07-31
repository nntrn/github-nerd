import { getTimeStamp } from './format'

export function supportLocalStorage() {
  return window.localStorage ? true : false
}

export function getLocalStorage(keyname) {
  return JSON.parse(localStorage.getItem(keyname))
}

export function getLocalApiStorage(user, api) {
  if (localStorage.getItem(user)) {
    const data = JSON.parse(localStorage.getItem(user)).data
    return data[api] ? data[api] : false
  } else {
    console.log(user + ' is not saved locally')
  }
  return false
}

export function setLocalStorage(obj) {
  let ls = getLocalStorage(obj.name)
  if (ls) {
    ls.data = { ...(ls.data || {}), ...obj.data }
    ls.id = getTimeStamp()
    localStorage.setItem(obj.name, JSON.stringify(ls))
  } else {
    obj.id = getTimeStamp()
    localStorage.setItem(obj.name, JSON.stringify(obj))
  }
}
