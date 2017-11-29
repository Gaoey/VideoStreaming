import {
  MediaStreamTrack,
  getUserMedia,
} from 'react-native-webrtc'
import {
  Platform
} from 'react-native'
import io from 'socket.io-client'
import {
  SOCKET_CONNECT
} from '../../constants/ActionTypes'
import {
  STATUS
} from '../../constants/status'

const socket = io.connect('https://react-native-webrtc.herokuapp.com', { transports: ['websocket'] })
const configuration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] }

const logError = (error) => {
  console.log('logError', error)
}

export const mapHash = (hash, func) => {
  const array = []
  for (const key in hash) {
    const obj = hash[key]
    array.push(func(obj, key))
  }
  return array
}

const getLocalStream = (isFront, callback) => {
  let videoSourceId
  if (Platform.OS === 'ios') {
    MediaStreamTrack.getSources((sourceInfos) => {
      console.log('sourceInfos: ', sourceInfos)
      for (let i = 0; i < sourceInfos.length; i += 1) {
        const sourceInfo = sourceInfos[i]
        if (sourceInfo.kind === 'video' && sourceInfo.facing === (isFront ? 'front' : 'back')) {
          videoSourceId = sourceInfo.id
          console.log(videoSourceId)
        }
      }
    })
  }
  getUserMedia({
    audio: true,
    video: {
      mandatory: {
        minWidth: 200,
        minHeight: 100,
        minFrameRate: 30,
      },
      facingMode: (isFront ? 'user' : 'environment'),
      optional: (videoSourceId ? [{ sourceId: videoSourceId }] : []),
    }
  }, (stream) => {
    console.log('getUserMedia success', stream)
    callback(stream)
  }, logError)
}

export const connectSocket = () => (dispatch) => {
  console.log('connect')
  dispatch({ type: SOCKET_CONNECT.REQUEST })
  return socket.on('connect', (data) => {
    getLocalStream(true, (stream) => {
      dispatch({
        type: SOCKET_CONNECT.SUCCESS,
        selfViewSrc: stream.toURL(),
        status: STATUS.READY,
        info: 'Please enter or create room ID',
        localStream: stream
      })
    })
  })
}
