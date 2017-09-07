import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Logo = () => (
  <View style={styles.container}>
    <Text>Logo</Text>
  </View>
  )
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})

export default Logo
