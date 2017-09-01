import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { View, Text } from 'react-native'

class FeedItem extends Component {
  static propTypes = {
    title: PropTypes.string
  }
  render() {
    const { title } = this.props
    return (
      <View>
        <Text>{title}</Text>
      </View>
    )
  }
}

export default FeedItem
