import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './reducers'
import callAPIMiddleware from './middlewares/callAPIMiddleware'

export default (initialState) => {
  const middlewares = [thunk, callAPIMiddleware, logger]

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
