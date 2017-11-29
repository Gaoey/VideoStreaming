import { combineReducers } from 'redux'
import posts from './feed/feedReducer'
import settings from './setting/settingReducer'
import connectReducer from './videoStreaming/connectionReducer'

export default combineReducers({
  feed: posts,
  settings,
  connectReducer
})
