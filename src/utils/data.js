export function deepObject(obj, func) {
  if (obj == null) return obj
  if (obj instanceof Array) {
    return obj.map(deepObject)
  }
  if (typeof func() == 'function') obj = func(obj)
  Object.values(obj).forEach(function(key) {
    deepObject(obj[key], func())
  })

  return obj
}

export function flatten(data) {
  if (typeof data === 'string') {
    data = JSON.parse(data) || ''
  }
  var result = {}

  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++) {
        recurse(cur[i], prop + '[' + i + ']')
      }
      if (l === 0) result[prop] = []
    } else {
      var isEmpty = true
      for (var p in cur) {
        isEmpty = false
        recurse(cur[p], prop ? prop + '.' + p : p)
      }
      if (isEmpty && prop) result[prop] = {}
    }
  }
  recurse(data, '')
  return result
}

export function unflatten(data) {
  if (Object(data) !== data || Array.isArray(data)) return data
  var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
    resultholder = {}
  for (var p in data) {
    var cur = resultholder,
      prop = '',
      m
    while ((m = regex.exec(p))) {
      cur = cur[prop] || (cur[prop] = m[2] ? [] : {})
      prop = m[2] || m[1]
    }
    cur[prop] = data[p]
  }
  return resultholder[''] || resultholder
}

export function arrayContainsArray(superset, subset) {
  if (0 === subset.length) {
    return false
  }
  return subset.every(function(value) {
    return superset.indexOf(value) >= 0
  })
}

// use in a filter function to remove duplicates
export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}

// function to check if array is increasing by 1
export function isIncreasingSequence(...numbers) {
  return numbers.every((number, i) => i === number || i === number - 1)
}
