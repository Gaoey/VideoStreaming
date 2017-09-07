import { Alert } from 'react-native'
import { isCallingAPI } from '../features/setting/settingActions'
import { configToken } from '../config'

export function expiredToken(dispatch) {
  const onPress = () => {
    configToken.redirect.expired()
    setTimeout(() => dispatch(isCallingAPI(false)), 500)
  }
  const title = 'Session has expired'
  const message = 'Your session has expired. Please log in again'
  // TODO wait set auto logout for clear all data
  // dispatch(logOut())
  return Alert.alert(title, message, [{ text: 'OK', onPress }], { cancelable: false })
}
