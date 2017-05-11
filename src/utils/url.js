import { map, isObject } from 'lodash'

export const buildQuery = (value, key) => {
  if (isObject(value)) {
    return map(value, (v, i) => buildQuery(v, `${key}[${i}]`)).join('&')
  }
  return `${key}=${value}`
}

export const endpointWithParams = (url, params) => {
  const arrayQuery = map(params, buildQuery)
  const query = arrayQuery.length > 0 ? `?${arrayQuery.join('&')}` : ''
  return url + query
}
