import { SET_API_IS_CALLING_TRUE, SET_API_IS_CALLING_FALSE } from '../../constants/ActionTypes'

export function isCallingAPI(status = false) {
  const type = status ? SET_API_IS_CALLING_TRUE : SET_API_IS_CALLING_FALSE
  return { type }
}
