import { useState, useEffect } from 'react'
import { setLocalStorage, getLocalApiStorage } from '../utils/localStorage'
import { getURLParams } from '../utils/url'

export default function Api(url) {
  const [data, setData] = useState({ data: {}})
  const { user, api } = getURLParams(url)

  useEffect(() => {
    async function fetchData() {
      await fetch(url)
        .then(response => response.json())
        .then(res => {
          setData(res)
          // only save to local storage if there isn't a message
          if(!res.message) {
            setLocalStorage({ name: user, data: { [api]: res }})
          }
        })
    }

    if(getLocalApiStorage(user, api)) {
      setData(getLocalApiStorage(user, api))
    } else {
      fetchData()
    }
  }, [api, url, user])

  return data
}
Api.defaultProps = {
  url: 'https://api.github.com/users/nntrn'
}
