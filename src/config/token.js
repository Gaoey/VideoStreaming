import _ from 'lodash'
import { Actions } from 'react-native-router-flux'

// when you have new token key you can config object key here such as 'userState.user.token'
const configTokenKey = ''
// config token when you need to fetch api without token from state in redux store
const customToken = ''

const getTokenFromState = (state) => {
  const stateToken = customToken || _.get(state, configTokenKey || 'authentication.token') || ''
  return stateToken
}

// config redirect scene
const redirectScene = {
  emptyToken: {
    key: 'errorPage',
    props: { title: 'emptyToken' }
  },
  expired: {
    key: 'errorPage',
    props: { title: 'expired' }
  }
}

const redirect = _.mapValues(redirectScene, value => () => Actions[value.key](value.props))

const config = {
  getToken: getTokenFromState,
  redirect
}

export default config
