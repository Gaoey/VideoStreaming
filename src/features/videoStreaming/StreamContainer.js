import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import _ from 'lodash'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { RTCView } from 'react-native-webrtc'
import { connectSocket, mapHash } from './connection'


class StreamContainer extends Component {

  static propTypes = {
    connectSocket: PropTypes.func,
    socket: PropTypes.object
  }

  componentDidMount() {
    this.props.connectSocket()
  }

  render() {
    const { socket } = this.props
    return (
      <View style={styles.container}>
        {_.isEmpty(socket.selfViewSrc) && <RTCView streamURL={socket.selfViewSrc} />}
        {
          // mapHash(this.state.remoteList, (remote, index) => <RTCView key={index} streamURL={remote} style={styles.remoteView} />)
        }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
})

const mapStateToProps = state => ({
  socket: state.ModularKit.connectReducer.socketConnectionReducer
})

export default connect(mapStateToProps, {
  connectSocket
})(StreamContainer)
