import React from 'react'
import { View, Text } from 'react-native'

function ErrorToken({ title }) {
  return (
    <View>
      <Text>Error token</Text>
      <Text>Error : {title}</Text>
    </View>
  )
}

export default ErrorToken
