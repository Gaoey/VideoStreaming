
import _, { assign, reduce } from 'lodash'
import { Schema, normalize } from 'normalizr'
import axios from 'axios'
import { expiredToken } from './expired'
import isCallingAPI from '../features/setting/settingActions'
import api from './api'
import { isEmpty } from '../utils/validation'
import { configToken, project } from '../config'
import statusCode from './statusCode.json'

const ERROR_CODE_UNAUTHORIZED = 401
const isFormatData = value => ((value.errors || value.error || value.data) ? true : false)

export const paginationFromAPI = (json) => {
  if (!json.count) {
    return undefined
  }

  const total = json.count
  const { offset = 0, limit = 500 } = json.params
  const totalPage = Math.ceil(total / limit)
  const currentPage = Math.floor(offset / limit)

  const params = reduce(json.params, (reduced, data, key) => {
    reduced[key] = data
    return reduced
  }, {})

  return assign({}, {
    totalPage,
    currentPage,
    total
  }, params)
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export const callApi = (endpoint, options = {}, schema, userToken) => {
  const token = (userToken !== null && userToken !== '') ? userToken : null
  axios.defaults.headers.common.Authorization = token

  let payload = options.body
  if (!options.method) {
    options.method = 'get'
    payload = options.query
  }

  return api[options.method.toLowerCase()](endpoint, payload)
    .then((res) => {
      const { status } = res.data
      const contentType = res.headers['content-type']

      // when response is not json
      if (contentType && contentType.indexOf('application/json') === -1) {
        return {
          error: statusCode[status],
          code: status
        }
      }

      // when response is json
      if (!isFormatData(res.data) && options.shouldCheckDataFormat) {
        return {
          error: statusCode[status],
          error_info: [res.data],
          code: status
        }
      }
      return res.data
    })
    .then((json) => {
      if (json.errors || json.error) {
        return Promise.reject(json)
      }

      const pagination = paginationFromAPI(json)
      const data = (schema) ? normalize(json.data, schema) : { result: json.data }
      return pagination ? assign({}, data, pagination) : data
    }, (err) => {
      const error = _.get(err, 'response.data.message') || _.get(err, 'response.data.error') || _.get(err, 'response.data.errors') || [(err instanceof Error) ? err.message : err]
      return Promise.reject({ error, code: _.get(err, 'response.status') || 0, error_info: _.get(err, 'response.data.error_info') || '' })
    })
}

const callAPIMiddleware = ({ dispatch, getState }) => next => (action) => {
  const {
      types,
      endpoint,
      schema = '',
      shouldCallAPI = () => true,
      payload = {},
      ...params
    } = action

  const options = { token: true, shouldCheckDataFormat: true, ...params.options }

  if (!types) {
      // Normal action: pass it on
    return next(action)
  }

  if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
    throw new Error('Expected an array of three string types.')
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  if (!shouldCallAPI(getState())) {
    return
  }

  const [requestType, successType, failureType] = types

  const getToken = configToken.getToken(getState())

  if (options.token && isEmpty(getToken)) {
    configToken.redirect.emptyToken()
    const textError = {
      type: failureType,
      error: ['Token is invalid.'],
      code: 401,
      error_info: []
    }
    return new Promise(resolve => resolve(textError))
  }

  next(assign({}, payload, {
    type: requestType
  }))

  return callApi(endpoint, options, schema, getToken).then(
      response => next(assign({}, payload, {
        type: successType,
        data: response,
        receivedAt: Date.now()
      })),
      (error) => {
        if (error.code === ERROR_CODE_UNAUTHORIZED && !getState()[project.name].settings.isCalling) {
          const calling = () => new Promise((resolve) => {
            dispatch(isCallingAPI(true))
            return resolve()
          })
          calling().then(() => expiredToken(dispatch))
        }
        return next(assign({}, payload, {
          type: failureType,
          error: error.error || error.errors,
          code: error.code || 0,
          error_info: error.error_info || []
        }))
      }
    )
}

export default callAPIMiddleware

