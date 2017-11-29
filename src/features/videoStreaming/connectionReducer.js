import { combineReducers } from 'redux'
import {
  SOCKET_CONNECT
} from '../../constants/ActionTypes'

const iceCandidate = {
  info: 'Initializing',
  status: 'init',
  roomID: '',
  isFront: true,
  selfViewSrc: '',
  remoteList: {},
}

const localParam = {
  pcPeers: {},
  localStream: {}
}

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  error: false,
  ...iceCandidate,
  ...localParam
}

const socketConnectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCKET_CONNECT.REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false
      }
    case SOCKET_CONNECT.SUCCESS:
      return {
        ...state,
        isFetching: false,
        isSuccess: true,
        selfViewSrc: action.selfViewSrc,
        status: action.status,
        info: action.info,
        localStream: action.localStream
      }
    case SOCKET_CONNECT.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default combineReducers({
  socketConnectionReducer
})
