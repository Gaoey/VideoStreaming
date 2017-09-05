/* eslint import/first: 0 */
import './themeConfig'
import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import * as config from './config'
import configureStore from './configureStore'
import Routes from './routes'

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
)

AppRegistry.registerComponent(config.project.name, () => App)
