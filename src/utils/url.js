export function getUrl() {
  const arr = window.location.search.replace('?', '').split('&')
  const obj = {}
  arr.forEach((e, i) => {
    let a = e.split('=')
    obj[a[0]] = a[1]
  })
  return obj
}
export function createQueryParam(query) {
  if (Object.keys(query).length > 0) {
    var arr = []
    arr.push('?')
    Object.keys(query).forEach(e => {
      arr.push(e + '=' + query[e])
      arr.push('&')
    })
    arr.pop()
    query = arr.join('')
  }
  return query
}

export function getURLParams(str) {
  const re = /(\/users\/)(?<user>[A-Za-z]+)(\W{0,})(?<api>\w{0,})/
  const result = re.exec(str)

  return {
    user: result.groups.user,
    api: result.groups.api === '' ? 'user' : result.groups.api
  }
}
