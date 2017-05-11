import { SET_API_IS_CALLING_TRUE, SET_API_IS_CALLING_FALSE } from '../../constants/ActionTypes'

const initialSettings = {
  isCalling: false
}

const settings = (state = initialSettings, action) => {
  switch (action.type) {
    case SET_API_IS_CALLING_TRUE:
      return Object.assign({}, state, { isCalling: true })
    case SET_API_IS_CALLING_FALSE:
      return Object.assign({}, state, { isCalling: false })
    default:
      return state
  }
}

export default settings
