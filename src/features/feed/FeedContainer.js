import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'

import { project } from '../../config'
import { fetchPostsIfNeeded } from './FeedAction'
import FeedList from './FeedList'

class FeedContainer extends Component {
  static propTypes = {
    fetchPost: PropTypes.func
  }
  componentDidMount() {
    this.props.fetchPost()
  }
  render() {
    return (
      <ScrollView>
        <FeedList postArr={this.props.feed} />
      </ScrollView>
    )
  }
}
const mapStateToProps = state => ({
  feed: state[project.name].feed
})
const mapDispatchToProps = dispatch => ({
  fetchPost: () => {
    dispatch(fetchPostsIfNeeded())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer)
