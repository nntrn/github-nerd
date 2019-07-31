export function groupObjectArrays(objectArray, property) {
  return objectArray.reduce(function(total, obj) {
    let key = obj[property]
    if (!total[key]) {
      total[key] = []
    }
    total[key].push(obj)
    return total
  }, {})
}

export const getXY = data => {
  const keys = Object.keys(data)
  let x = [],
    y = []
  keys.forEach(e => {
    x.push(e)
    y.push(data[e].length)
  })
  return { x: x, y: [y] }
}

export const formatXYAxis = data => {
  return { labels: getXY(data).x, series: getXY(data).y }
}
