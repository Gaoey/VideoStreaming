// import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { FeedContainer } from '../../features'
import { project } from '../../config'

// create a component
class Home extends Component {
  render() {
    return (
      <View>
        <Text>Home on modular</Text>
        <Button
          onPress={() => Actions[`${project.name}About`]()}
          title="About Scene"
          color="orange"
          accessibilityLabel="Go to about scene" />
        <Button
          onPress={() => Actions[`${project.name}Form`]()}
          title="Form"
          color="blue"
          accessibilityLabel="Go to form scene" />

        <FeedContainer />
      </View>
    )
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})

// make this component available to the app
export default Home
