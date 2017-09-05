import { combineReducers } from 'redux'
import posts from './feed/feedReducer'
import settings from './setting/settingReducer'

export default combineReducers({
  feed: posts,
  settings
})
