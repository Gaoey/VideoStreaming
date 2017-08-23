import axios from 'axios'
import { configToken } from '../config';

const axiosMiddleWare = store => next => action => {
  axios.defaults.responseType = 'json'
  axios.defaults.headers.common['Content-Type'] = 'application/json'
  axios.defaults.headers.common['Authorization'] = configToken.getToken(store)

  return next(action)
}

export default axiosMiddleWare
