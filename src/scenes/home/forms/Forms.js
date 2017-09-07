import React from 'react'
import { View, Text, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { project } from '../../../config'

const Forms = () => (
  <View>
    <Text>Forms</Text>
    <Button
      onPress={() => Actions[`${project.name}DefaultForm`]()}
      title="Default Form"
      color="blue"
      accessibilityLabel="Go to default form scene" />
    <Button
      onPress={() => Actions[`${project.name}InitForm`]()}
      title="Init Form"
      color="blue"
      accessibilityLabel="Go to init form scene" />
    <Button
      onPress={() => Actions[`${project.name}ValidateForm`]()}
      title="Validate Form"
      color="blue"
      accessibilityLabel="Go to validate form scene" />
  </View>
)

export default Forms
