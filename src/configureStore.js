import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import Sherlockholmes from 'sherlockholmes'
import reducers from './reducers'
import callAPIMiddleware from './middlewares/callAPIMiddleware'

const { inspector } = new Sherlockholmes()

export default (initialState) => {
  const middlewares = [thunk, callAPIMiddleware, inspector]

  const enhancer = compose(
    applyMiddleware(...middlewares),
    global.reduxNativeDevTools ? global.reduxNativeDevTools(/*options*/) : nope => nope,
  )

  const store = createStore(reducers, initialState, enhancer)

  if (global.reduxNativeDevTools) {
    global.reduxNativeDevTools.updateStore(store);
  }
  return store
}
